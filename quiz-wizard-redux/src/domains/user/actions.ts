import {createAction} from '@reduxjs/toolkit'
import type {AuthPayload} from 'quiz-wizard-client'
import type {UserSchema} from 'quiz-wizard-schema'

import {createThunkAction} from '../../common'

const getUserFromPayload = (payload?: AuthPayload) =>
  payload?.user

export const authorizeUser = createThunkAction(
  'AuthorizeUser',
  (_, {extra: {services}}) => services.auth
    .getAuthorized()
    .then(getUserFromPayload)
)

export const setUser = createAction<UserSchema | undefined>('SetUser')

export const signUp = createThunkAction(
  'SignUp',
  (
    {email, password, user}: {email: string, password: string, user: UserSchema},
    {extra: {services}}
  ) => services.auth
    .signUp(email, password, user)
    .then(getUserFromPayload)
)

export const signIn = createThunkAction(
  'SignIn',
  (
    {email, password}: {email: string, password: string},
    {extra: {services}}
  ) => services.auth
    .signIn(email, password)
    .then(getUserFromPayload)
)

export const signOut = createThunkAction(
  'SignOut',
  (_, {extra: {services}}) => services.auth.signOut()
)
