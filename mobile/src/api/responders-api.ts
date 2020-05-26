import {Responder, ResponderId} from '@types'

import {Api} from './api'

export class RespondersApi extends Api {
  public getResponders = () => this.get<Responder[]>('/responders')

  public createQuiz = (responder: Responder) =>
    this.post<ResponderId, Responder>('/responders', responder)

  public deleteQuiz = (responderId: ResponderId) =>
    this.delete<ResponderId>(`/responders/${responderId}`)
}
