import {Quiz, UUID} from '@types'

import {Api} from './api'
import {quizzes} from './mocks'

export class QuizzesApi extends Api {
  public getQuizzes = (): Promise<Quiz[]> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(quizzes), 500)
        })
    )
  }

  public createQuiz = (quiz: Quiz): Promise<Quiz> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(quiz), 500)
        })
    )
  }

  public deleteQuiz = (quizId: UUID): Promise<UUID> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(quizId), 500)
        })
    )
  }
}
