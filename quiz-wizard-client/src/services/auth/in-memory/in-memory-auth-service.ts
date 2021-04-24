import {UserSchema} from 'quiz-wizard-schema'

import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {createToken, parseToken, delayMethods} from '../../../helpers'
import {createInvalidCredentialsError, createUserAlreadyExistsError} from '../errors'
import {AuthService, Tokens} from '../types'

const userDataToAuthData = (
  userData?: UserSchema & {password?: string}
) => userData && ({
  user: userData,
  password: userData.password ?? userData.email.split('@')[0],
  tokens: {
    accessToken: createToken({
      email: userData.email
    })
  }
})

export const createInMemoryAuthService = (
  authLayer: AuthLayer,
  persistentStorage: PersistentStorage,
  inMemoryUserDataStorageKey = 'in-memory-user-data',
  latency = 750
): AuthService => {
  const getAllUserData = () => persistentStorage
    .getData<Record<string, UserSchema>>(inMemoryUserDataStorageKey)

  const getUserData = (email: string) => getAllUserData()
    .then((userData) => userData?.[email])

  const setUserData = (
    email: string,
    password: string,
    user: UserSchema
  ) => getAllUserData()
    .then((userData) => persistentStorage
      .setData(
        inMemoryUserDataStorageKey,
        {...userData, [email]: {...user, password}}
      )
    )

  const signUp = async (
    email: string,
    password: string,
    user: UserSchema
  ) => {
    const authData = await getUserData(email).then(userDataToAuthData)

    if (authData) {
      throw createUserAlreadyExistsError()
    }

    const tokens: Tokens = {
      accessToken: createToken({email})
    }

    await setUserData(email, password, user)
    await authLayer.setAccessToken(tokens.accessToken)

    return {user, tokens}
  }

  const signIn = async (
    email: string,
    password: string
  ) => {
    const authData = await getUserData(email).then(userDataToAuthData)

    if (!authData) {
      throw createInvalidCredentialsError()
    }

    if (authData.password !== password) {
      throw createInvalidCredentialsError()
    }

    await authLayer.setAccessToken(authData.tokens.accessToken)

    return authData
  }

  const signOut = async () => {
    await authLayer.removeAccessToken()
  }

  const getAuthorized = async () => {
    const token = await authLayer.getAccessToken()

    if (!token) {
      return
    }

    const {email} = parseToken(token)
    return getUserData(email).then(userDataToAuthData)
  }

  return delayMethods(
    {
      signUp,
      signIn,
      signOut,
      getAuthorized
    },
    latency
  )
}
