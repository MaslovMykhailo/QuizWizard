import UUIDGenerator from 'react-native-uuid-generator'
import {observable, computed, action} from 'mobx'
import {AnswerOption, Quiz} from '@types'
import i18next from 'i18next'

export class QuizStore {
  private id: string = ''

  private refreshId = () => {
    UUIDGenerator.getRandomUUID().then((uuid) => (this.id = uuid))
  }

  @observable name: string = ''

  @observable answers: Set<AnswerOption>[] = [this.defaultAnswer]

  constructor(quiz?: Quiz | null, copy = false) {
    this.refreshId()
    if (quiz) {
      this.name = copy
        ? `${quiz.name} ${i18next.t('COPY_INDICATOR')}`
        : quiz.name
      this.answers = quiz.answers.map((options) => new Set(options))
    }
  }

  @computed get answersList() {
    return this.answers.slice()
  }

  @computed get canAddAnswer() {
    return this.answers.length < 30
  }

  @computed get quiz(): Quiz {
    return {
      id: this.id,
      name: this.name || i18next.t('QUIZ_NAME_PLACEHOLDER'),
      answers: this.answers.map((options) => Array.from(options)),
      creationDate: new Date()
    }
  }

  @action changeName = (name: string) => {
    this.name = name
  }

  @action toggleAnswerOption = (answerIndex: number, option: AnswerOption) => {
    const options = this.answers[answerIndex]
    if (options) {
      if (options.has(option)) {
        options.delete(option)
      } else {
        options.add(option)
      }
    }
  }

  @action addAnswer = () => {
    if (this.canAddAnswer) {
      this.answers.push(this.defaultAnswer)
    }
  }

  @action removeAnswer = (answerIndex: number) => {
    if (this.answers[answerIndex]) {
      this.answers.splice(answerIndex, 1)
    }
  }

  @action reset = () => {
    this.name = ''
    this.answers = [this.defaultAnswer]
    this.refreshId()
  }

  private get defaultAnswer() {
    return new Set<AnswerOption>(['A'])
  }
}
