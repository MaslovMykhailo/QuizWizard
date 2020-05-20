import {Answer, UUID} from '@types'

import {Api} from './api'
import {answers} from './mocks'

export class AnswersApi extends Api {
  private storage = answers

  public getAnswers = (): Promise<Answer[]> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(this.storage), 500)
        })
    )
  }

  public createAnswer = (answer: Answer): Promise<UUID> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          this.storage.push(answer)
          setTimeout(() => resolve(answer.id), 500)
        })
    )
  }

  public deleteAnswer = (answerId: UUID): Promise<UUID> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          this.storage = this.storage.filter(({id}) => id !== answerId)
          setTimeout(() => resolve(answerId), 500)
        })
    )
  }
}
