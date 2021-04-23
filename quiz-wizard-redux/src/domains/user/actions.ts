import {createAction} from '@reduxjs/toolkit'
import type {AuthPayload} from 'quiz-wizard-client'
import type {UserSchema} from 'quiz-wizard-schema'

import {createAsyncThunkAction} from '../../common'

const getUserFromPayload = (payload?: AuthPayload) =>
  payload?.user

export const authorizeUser = createAsyncThunkAction(
  'AuthorizeUser',
  (_, {extra: {services}}) => services.auth
    .getAuthorized()
    .then(getUserFromPayload)
)

export const setUser = createAction<UserSchema | undefined>('SetUser')

export const signUp = createAsyncThunkAction(
  'SignUp',
  (
    {email, password, user}: {email: string, password: string, user: UserSchema},
    {extra: {services}}
  ) => services.auth
    .signUp(email, password, user)
    .then(getUserFromPayload)
)

export const signIn = createAsyncThunkAction(
  'SignIn',
  (
    {email, password}: {email: string, password: string},
    {extra: {services}}
  ) => services.auth
    .signIn(email, password)
    .then(getUserFromPayload)
)

export const signOut = createAsyncThunkAction(
  'SignOut',
  (_, {extra: {services}}) => services.auth.signOut()
)

export const fetchUserData = createAsyncThunkAction(
  'FetchUserData',
  (_, {extra: {services}}) => services.user.getUserData()
)

export const updateUserData = createAsyncThunkAction(
  'UpdateUserData',
  (userData: UserSchema, {extra: {services}}) => services.user.updateUserData(userData)
)
