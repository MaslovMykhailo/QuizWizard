import {observable, action, computed} from 'mobx'
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk'
import {ignore, ObservableResource} from '@utils'

export class UserStore {
  @observable userId: string | null = null

  userName = new ObservableResource<string>()

  userPhotoUrl = new ObservableResource<string>()

  accessToken = new ObservableResource<string>()

  constructor() {
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
    return AccessToken.getCurrentAccessToken()
      .then((token) => {
        if (token) {
          this.accessToken.success(token.accessToken)
          this.userId = token.getUserId()
        } else {
          this.accessToken.notFound()
          this.userId = null
        }
      })
      .catch((error: object) => {
        this.accessToken.fail(error)
        this.userId = null
      })
  }

  @action fetchUserData = () => {
    this.userName.fetch()
    this.userPhotoUrl.fetch()
    new GraphRequestManager()
      .addRequest(this.getUserNameRequest())
      .addRequest(this.getUserPhotoUrlRequest())
      .start()
  }

  @action loginUser = () => {
    LoginManager.logInWithPermissions(['public_profile'])
      .then((result) => {
        if (result.error || result.isCancelled) {
          return
        }

        this.fetchAccessToken()
        this.fetchUserData()
      })
      .catch(ignore)
  }

  @action logoutUser = () => {
    LoginManager.logOut()
    this.userId = null
    this.userName.clear()
    this.userPhotoUrl.clear()
    this.accessToken.clear()
  }

  private getUserNameRequest = () =>
    new GraphRequest('/me', null, (error, result) => {
      if (error) {
        return this.userName.fail(error)
      }

      if (result && 'name' in result) {
        this.userName.success((result as {name: string}).name)
      } else {
        this.userName.notFound()
      }
    })

  private getUserPhotoUrlRequest = () =>
    new GraphRequest(
      '/me/picture?redirect=0&height=200&width=200&type=square',
      null,
      (error, result) => {
        if (error) {
          return this.userPhotoUrl.fail(error)
        }

        if (result && 'data' in result) {
          this.userPhotoUrl.success((result as {data: {url: string}}).data.url)
        } else {
          this.userPhotoUrl.notFound()
        }
      }
    )
}
