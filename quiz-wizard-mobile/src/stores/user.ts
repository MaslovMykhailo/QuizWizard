import {observable, action, computed, runInAction, makeObservable} from 'mobx'
import {ObservableResource} from '@utils'

export class UserStore {
  @observable userId: string | null = null

  userName = new ObservableResource<string>()

  userPhotoUrl = new ObservableResource<string>()

  accessToken = new ObservableResource<string>()

  constructor() {
    makeObservable(this)
    this.fetchAccessToken().then(() => {
      if (this.userLoggedIn) {
        this.fetchUserData()
      }
    })
  }

  @computed get userLoggedIn() {
    return this.accessToken.data !== null
  }

  @action fetchAccessToken = () => {
    this.accessToken.fetch()
    return new Promise<void>(resolve => {
      setTimeout(
        () => {
          runInAction(() => {
            this.accessToken.success('access-token')
            this.userId = 'user-id'
          })
          resolve()
        },
        1000
      )
    })
  }

  @action fetchUserData = () => {
    this.userName.fetch()
    this.userPhotoUrl.fetch()

    setTimeout(
      () => {
        runInAction(() => {
          this.userName.success('Demo User')
          this.userPhotoUrl.notFound()
        })
      },
      1000
    )
  }

  @action loginUser = () => {
    this.fetchAccessToken()
    this.fetchUserData()
  }

  @action logoutUser = () => {
    this.userId = null
    this.userName.clear()
    this.userPhotoUrl.clear()
    this.accessToken.clear()
  }
}
