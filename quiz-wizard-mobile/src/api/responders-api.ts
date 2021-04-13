import {Responder, ResponderId} from '@types'

import {Api} from './api'

export class RespondersApi extends Api {
  public getResponders = () => this.get<Responder[]>('/responders')

  public createResponder = (responder: Responder) =>
    this.post<ResponderId, Responder>('/responders', responder)

  public deleteResponder = (responderId: ResponderId) =>
    this.delete<ResponderId>(`/responders/${responderId}`)
}
