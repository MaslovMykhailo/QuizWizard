import {createToken, parseToken, delayMethods} from "../../../helpers"
import {AuthLayer} from "../../../layers"
import {UserSchema} from "../../../schemas"
import {createInvalidCredentialsError, createUserAlreadyExistsError} from "../errors"
import {AuthService, Tokens} from "../types"

import {data} from "./data"

type Email = string;

type AuthData = Map<Email, {
  tokens: Tokens
  userData: UserSchema
  password: string
}>

export const createInMemoryAuthService = (
  authLayer: AuthLayer,
  latency = 250 
): AuthService<UserSchema> => {
  const authData = data.reduce<AuthData>(
    (records, record) => {
      records.set(record.email, { 
        userData: record,
        password: record.email.split('@')[0],
        tokens: {
          accessToken: createToken({
            email: record.email
          })
        }
      })
      return records
    },
    new Map()
  )

  const signUp = async (
    email: string,
    password: string,
    userData: UserSchema
  ) => {
    if (authData.has(email)) {
      throw createUserAlreadyExistsError()
    }

    const tokens: Tokens = {
      accessToken: createToken({email})
    }

    authData.set(email, {password, tokens, userData})
    await authLayer.setAccessToken(tokens.accessToken)

    return {userData, tokens}
  }

  const signIn = async (
    email: string,
    password: string
  ) => {
    if (!authData.has(email)) {
      throw createInvalidCredentialsError()
    }

    const record = authData.get(email)

    if (!record || record?.password !== password) {
      throw createInvalidCredentialsError()
    }

    await authLayer.setAccessToken(record.tokens.accessToken)

    return record
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
    return authData.get(email)
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