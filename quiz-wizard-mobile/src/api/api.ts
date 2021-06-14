import AsyncStorage from '@react-native-community/async-storage'
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
    return new Promise<string>((resolve, reject) => {
      if (this.auth) {
        resolve(this.token.data!)
      } else {
        reject(new Error('User is not authenticated'))
      }
    })
  }

  public post<T extends string, D extends {id: string}>(url: string, data: D) {
    return this.withAuth()
      .then(() => AsyncStorage.setItem(`${url}/${data.id}`, JSON.stringify(data)))
      .then(() => data.id as T)
  }

  public get<T>(url: string) {
    return this.withAuth()
      .then(() => AsyncStorage.getItem(url))
      .then<T>((data) => data ? JSON.parse(data) : data)
  }

  public delete<T extends string>(url: string) {
    return this.withAuth()
      .then(() => AsyncStorage.removeItem(url))
      .then(() => url.split('/').pop() as T)
  }

  protected normalizeDate = <T extends {[key in K]: Date}, K extends keyof T>(
    data: T,
    key: K
  ) => {
    data[key] = new Date(data[key]) as T[K]
    return data
  }
}
