import {Quiz, UUID} from '@types'

import {Api} from './api'
import {quizzes} from './mocks'

export class QuizzesApi extends Api {
  private storage = quizzes

  public getQuizzes = (): Promise<Quiz[]> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(this.storage), 500)
        })
    )
  }

  public createQuiz = (quiz: Quiz): Promise<UUID> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          this.storage.push(quiz)
          setTimeout(() => resolve(quiz.id), 500)
        })
    )
  }

  public deleteQuiz = (quizId: UUID): Promise<UUID> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          this.storage = this.storage.filter(({id}) => id !== quizId)
          setTimeout(() => resolve(quizId), 500)
        })
    )
  }
}
