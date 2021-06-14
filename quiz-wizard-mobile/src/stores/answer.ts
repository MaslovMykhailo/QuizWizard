import UUIDGenerator from 'react-native-uuid-generator'
import {observable, computed, action, makeObservable} from 'mobx'
import {
  ResponderId,
  AnswerOptions,
  UUID,
  Quiz,
  Answer,
  DecodedResult
} from '@types'
import {i18next} from '@localization'
import {checkQuiz} from '@utils'

export class AnswerStore {
  @observable id: UUID = ''

  @observable name = ''
  @observable quizId: UUID = ''
  @observable answers: AnswerOptions[] = []
  @observable correctAnswers: AnswerOptions[] = []

  @observable sheetBase64: string | undefined = undefined
  @observable responderId: ResponderId | undefined = undefined

  constructor(quiz?: Quiz) {
    makeObservable(this)
    if (quiz) {
      this.quizId = quiz.id
      this.name = `${quiz.name} - ${i18next.t('RESULT_INDICATOR')}`
      this.correctAnswers = quiz.answers
      UUIDGenerator.getRandomUUID().then((uuid) => (this.id = uuid))
    }
  }

  @action changeName = (name: string) => {
    this.name = name
  }

  @action changeResponderId = (id?: ResponderId) => (this.responderId = id)

  @action processDecodedAnswers = ({
    answers,
    responderId,
    sheetBase64
  }: DecodedResult) => {
    this.answers = answers as AnswerOptions[]
    ;(this.responderId = responderId)
    ;(this.sheetBase64 = sheetBase64)
  }

  @computed get answer(): Answer {
    return {
      id: this.id,
      quizId: this.quizId,
      name: this.name,
      answers: this.answers,
      responderId: this.responderId,
      creationDate: new Date()
    }
  }

  @computed get checkedAnswers() {
    return checkQuiz(this.correctAnswers.slice(), this.answers.slice())
  }
}
