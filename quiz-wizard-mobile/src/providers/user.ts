import {createContext, useContext} from 'react'
import {UserStore, userStore} from '@stores'

type UserContextValue = {
  store: UserStore
}

export const UserContext = createContext<UserContextValue>({
  store: userStore
})

export const useUserLogin = () => {
  const {store} = useContext(UserContext)
  return store.loginUser
}

export const useUserLogout = () => {
  const {store} = useContext(UserContext)
  return store.logoutUser
}

export const useAuth = () => {
  const {store} = useContext(UserContext)
  return [store.userLoggedIn, store.accessToken.loading] as const
}

export const useUserProfile = () => {
  const {store} = useContext(UserContext)
  return {
    name: store.userName,
    photoUrl: store.userPhotoUrl
  }
}
