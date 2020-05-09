import {observable, action, computed} from 'mobx'
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk'
import {ignore, ObservableResource, ResourceStatus} from '@utils'

export class UserStore {
  private graphRequestManager = new GraphRequestManager()

  @observable userId: string | null = null

  userName = new ObservableResource<string>()

  userPhotoUrl = new ObservableResource<string>()

  accessToken = new ObservableResource<string>()

  constructor() {
    this.fetchAccessToken()
  }

  @computed get userLoggedIn() {
    return this.accessToken.data.get() !== null
  }

  @action fetchAccessToken = () => {
    this.accessToken.fetch()
    AccessToken.getCurrentAccessToken()
      .then((token) => {
        if (token) {
          this.accessToken.data.set(token.accessToken)
          this.userId = token.getUserId()
        } else {
          this.accessToken.data.set(null)
          this.accessToken.status = ResourceStatus.Success
          this.userId = null
        }
      })
      .catch((error: object) => {
        this.accessToken.error.set(error)
        this.userId = null
      })
  }

  @action fetchUserData = () => {
    this.userName.fetch()
    this.userPhotoUrl.fetch()

    this.graphRequestManager
      .addRequest(this.getUserNameRequest())
      .addRequest(this.getUserPhotoUrlRequest())
      .start()
  }

  @action loginUser = () => {
    LoginManager.logInWithPermissions(['public_profile'])
      .then((result) => {
        if (result.error) {
          console.log('Error')
          return
        }

        if (result.isCancelled) {
          console.log('Cancelled')
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
        console.log(error)
        return this.userName.error.set(error)
      }

      console.log(result)
    })

  private getUserPhotoUrlRequest = () =>
    new GraphRequest(
      '/me/picture?redirect=0&height=200&width=200&type=square',
      null,
      (error, result) => {
        if (error) {
          console.log()
          return this.userPhotoUrl.error.set(error)
        }

        console.log(result)
      }
    )
}
