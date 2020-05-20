import {Responder, ResponderId} from '@types'

import {Api} from './api'
import {responders} from './mocks'

export class RespondersApi extends Api {
  private storage = responders

  public getResponders = (): Promise<Responder[]> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(this.storage), 500)
        })
    )
  }

  public createResponder = (responder: Responder): Promise<ResponderId> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          this.storage.push(responder)
          setTimeout(() => resolve(responder.id), 500)
        })
    )
  }

  public deleteResponder = (responderId: ResponderId): Promise<ResponderId> => {
    return this.withAuth().then(
      () =>
        new Promise((resolve) => {
          this.storage = this.storage.filter(({id}) => id !== responderId)
          setTimeout(() => resolve(responderId), 500)
        })
    )
  }
}
