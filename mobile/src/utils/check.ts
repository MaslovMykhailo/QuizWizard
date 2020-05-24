import {Quiz, AnswerOptions, QuizResult, CheckedAnswerOptions} from '@types'

/**
 * @Note
 * @param grade equals
 * {count of correct answer options} / {common count of answer options}
 */

export const checkQuiz = (
  {answers: correctAnswers}: Quiz,
  answers: AnswerOptions[]
): QuizResult => {
  const answersCount = Math.max(correctAnswers.length, answers.length)

  const checkedAnswerOptions: CheckedAnswerOptions[] = new Array(answersCount)
    .fill(null)
    .map((_, answerIndex) => {
      const correctOptions = new Set(correctAnswers[answerIndex] ?? [])
      const answerOptions = new Set(answers[answerIndex] ?? [])

      const allOptions = new Set([...correctOptions, ...answerOptions])

      return Array.from(allOptions).map((option) => {
        if (correctOptions.has(option) && answerOptions.has(option)) {
          return {
            option,
            correct: true
          }
        }

        if (correctOptions.has(option)) {
          return {
            option,
            missed: true
          }
        }

        return {
          option
        }
      })
    })

  const incorrectCount = checkedAnswerOptions.reduce(
    (grade, options) =>
      grade + options.filter(({correct, missed}) => !correct || missed).length,
    0
  )

  const correctCount = correctAnswers.reduce(
    (grade, options) => grade + options.length,
    0
  )

  return {
    grade: Math.max(correctCount - incorrectCount, 0) / correctCount,
    options: checkedAnswerOptions
  }
}
