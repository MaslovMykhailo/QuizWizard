import {jsPDF} from 'jspdf'
import kebabCase from 'lodash/kebabCase'
import {QuestionSchema, QuizSchema} from 'quiz-wizard-schema'

import {answerOptions} from './answer-options'

const nonBlocking = <T>(f: () => T, timer?: number): Promise<T> => new Promise(
  (resolve) => timer ?
    setTimeout(() => resolve(f()), timer) :
    requestAnimationFrame(() => resolve(f()))
)

const blobToDataURL = (blob: Blob) => new Promise<[string, string]>(
  (resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () =>
      typeof reader.result === 'string' ?
        resolve([reader.result, blob.type]) :
        reject()
    reader.onerror = () => reject()
    reader.readAsDataURL(blob)
  }
)

const urlToDataURL = (url: string) => fetch(url)
  .then(response => response.blob())
  .then(blobToDataURL)

const maxImageSize = {
  width: 250,
  height: 210
}

const getOptimalImageSize = async (imageData: string) => {
  const {width, height} = await new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject()
    image.src = imageData
  })

  if (width > height) {
    return {
      width: maxImageSize.width,
      height: Math.round(height * maxImageSize.width / width)
    }
  } else {
    return {
      width: Math.round(width * maxImageSize.height / height),
      height: maxImageSize.height
    }
  }
}

class QuizFormatter {

  private offset = 24

  private pageVerticalOffset = this.offset * 2

  private pageHorizontalOffset = this.offset * 2

  private offsetTop = this.pageVerticalOffset

  private pageWidth: number

  private pageHeight: number

  private pagesCount = 1

  private doc: jsPDF

  constructor(private quiz: QuizSchema) {
    this.doc = new jsPDF('p', 'pt', 'a4')
    this.pageWidth = this.doc.internal.pageSize.getWidth()
    this.pageHeight = this.doc.internal.pageSize.getHeight()
  }

  insertPage() {
    this.doc.addPage()
    this.offsetTop = this.pageVerticalOffset
    this.pagesCount++
  }

  renderText(
    text: string,
    align: 'left' | 'center' = 'left',
    fontSize = 14,
    fontStyle: 'normal' | 'italic' | 'bold' = 'normal',
    widthToFit = this.pageWidth - this.pageHorizontalOffset * 2
  ): void {
    this.doc.setFontSize(fontSize)
    this.doc.setFont(this.doc.getFont().fontName, fontStyle)

    const lines = this.doc.splitTextToSize(text, widthToFit)
    const estimatedTextBottom = this.offsetTop + lines.length * this.doc.getLineHeight()

    const offsetLeft = align === 'left' ? this.pageHorizontalOffset : this.pageWidth / 2

    if (estimatedTextBottom <= this.pageHeight - this.pageVerticalOffset) {
      // the text fits to the page and can be rendered
      this.doc.text(lines, offsetLeft, this.offsetTop, {align})
      this.offsetTop = estimatedTextBottom
    } else {
      // the text does not fit to the page, it should be split
      const linesCountToFit = Math.ceil(
        (this.pageHeight - this.pageVerticalOffset - this.offsetTop) / this.doc.getLineHeight()
      )

      const linesToFit = lines.slice(0, linesCountToFit)
      this.doc.text(linesToFit, offsetLeft, this.offsetTop, {align})

      this.insertPage()

      return this.renderText(
        lines.slice(linesCountToFit).join(' '),
        align,
        fontSize,
        fontStyle,
        widthToFit
      )
    }
  }

  async renderQuestionPicture(picture: string | Blob) {
    const [image, type] = await (
      picture instanceof Blob ?
        blobToDataURL(picture) :
        urlToDataURL(picture)
    )

    const {width, height} = await getOptimalImageSize(image)

    if (
      this.offsetTop + height - this.doc.getLineHeight() / 2 >
      this.pageHeight - this.pageVerticalOffset
    ) {
      // image does not fit to the page
      this.insertPage()
    }

    const x = this.pageWidth - this.pageHorizontalOffset - width
    const y = Math.round(this.offsetTop - this.doc.getLineHeight() / 2)

    await nonBlocking(() => this.doc.addImage(image, type, x, y, width, height))

    return {x, y, width, height}
  }

  async renderQuestion(question: QuestionSchema, index: number) {
    this.renderText(`${index}. ${question.text}`)
    this.offsetTop += Math.round(this.doc.getLineHeight() / 2)

    let widthToFit: number | undefined = undefined
    let heightToFit: number | undefined = undefined

    if (question.picture) {
      const {x, y, height} = await this.renderQuestionPicture(question.picture)
      widthToFit = x - this.offset - this.pageHorizontalOffset
      heightToFit = y + height
    }

    const pageToFit = this.pagesCount
    const options = answerOptions.filter((option) => question.answers[option])

    options.forEach((option) => {
      const {text} = question.answers[option]!
      if (heightToFit && this.offsetTop < heightToFit && pageToFit === this.pagesCount) {
        this.renderText(`${option}) ${text}`, 'left', 14, 'normal', widthToFit)
      } else {
        this.renderText(`${option}) ${text}`)
      }
    })

    if (heightToFit && this.offsetTop < heightToFit && pageToFit === this.pagesCount) {
      this.offsetTop = heightToFit + this.offset
      if (this.offsetTop > this.pageHeight - this.pageVerticalOffset) {
        this.insertPage()
      }
    }
  }

  async generateQuizSheet() {
    const {name, description, questions, questionsOrder} = this.quiz

    await nonBlocking(() => this.renderText(name, 'center', 24))

    if (description) {
      await nonBlocking(() => this.renderText(description, 'center', 16, 'italic'))
    }

    this.offsetTop += Math.round(this.doc.getLineHeight() / 2)

    for (let index = 0; index < questionsOrder.length; index++) {
      await nonBlocking(() => this.renderQuestion(questions[questionsOrder[index]], index + 1))
    }

    await nonBlocking(() => this.doc.save(kebabCase(this.quiz.name)))
  }

}

export const generateQuizSheet = (quiz: QuizSchema) => nonBlocking(
  () => new QuizFormatter(quiz).generateQuizSheet(),
  500
)
