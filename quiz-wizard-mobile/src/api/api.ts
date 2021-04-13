import {ObservableResource} from '@utils'

export class Api {
  private baseUrl = 'https://quizwizardweb20200524070904.azurewebsites.net/api'

  private token: ObservableResource<string>

  constructor(token: ObservableResource<string>) {
    this.token = token
  }

  public get auth() {
    return this.token.ready && this.token.data !== null
  }

  public withAuth() {
    return new Promise<string>((resolve, reject) => {
      if (this.auth) {
        resolve(this.token.data!)
      } else {
        reject(new Error('User is not authenticated'))
      }
    })
  }

  public post<T, D>(url: string, data: D) {
    return this.withAuth().then((token) =>
      fetch(this.baseUrl + url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => this.handleResponse<T>(response))
    )
  }

  public get<T>(url: string) {
    return this.withAuth()
      .then((token) =>
        fetch(this.baseUrl + url, {
          method: 'GET',
          headers: {Authorization: token, 'content-type': 'application/json'}
        })
      )
      .then((response) => this.handleResponse<T>(response))
  }

  public delete<T>(url: string) {
    return this.withAuth()
      .then((token) =>
        fetch(this.baseUrl + url, {
          method: 'DELETE',
          headers: {
            Authorization: token,
            'content-type': 'application/json'
          }
        })
      )
      .then((response) => this.handleResponse<T>(response))
  }

  private handleResponse<T>(response: Response) {
    if (response.ok) {
      return response.json() as Promise<T>
    } else {
      return Promise.reject(response)
    }
  }

  protected normalizeDate = <T extends {[key in K]: Date}, K extends keyof T>(
    data: T,
    key: K
  ) => {
    data[key] = new Date(data[key]) as T[K]
    return data
  }
}
