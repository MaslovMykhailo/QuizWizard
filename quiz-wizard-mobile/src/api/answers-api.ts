import {Answer, UUID} from '@types'

import {Api} from './api'

export class AnswersApi extends Api {
  public getAnswers = () =>
    this.get<Answer[]>('/answers').then((answers) =>
      answers ? answers.map(this.normalizeAnswerDate) : []
    )

  public createAnswer = (answer: Answer) =>
    this.post<UUID, Answer>('/answers', answer)

  public deleteAnswer = (answerId: UUID) =>
    this.delete<UUID>(`/answers/${answerId}`)

  public normalizeAnswerDate = (answer: Answer) =>
    this.normalizeDate(answer, 'creationDate')
}
