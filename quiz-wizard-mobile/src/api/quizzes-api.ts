import {Quiz, UUID} from '@types'

import {Api} from './api'

export class QuizzesApi extends Api {
  public getQuizzes = () =>
    this.get<Quiz[]>('/quizzes').then((quizzes) =>
      quizzes.map(this.normalizeQuizDate)
    )

  public createQuiz = (quiz: Quiz) => this.post<UUID, Quiz>('/quizzes', quiz)

  public deleteQuiz = (quizId: UUID) => this.delete<UUID>(`/quizzes/${quizId}`)

  private normalizeQuizDate = (quiz: Quiz) =>
    this.normalizeDate(quiz, 'creationDate')
}
