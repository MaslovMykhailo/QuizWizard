import {ObservableResource} from '@utils'

export class Api {
  private token: ObservableResource<string>

  constructor(token: ObservableResource<string>) {
    this.token = token
  }

  public get auth() {
    return this.token.ready && this.token.data !== null
  }

  public withAuth() {
    return new Promise((resolve, reject) => {
      if (this.auth) {
        resolve()
      } else {
        reject(new Error('User is not authenticated'))
      }
    })
  }
}
