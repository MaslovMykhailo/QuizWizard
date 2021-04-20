import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import {Services} from 'quiz-wizard-client'

import {UserState, userReducer} from '../domains/user'
import {PreferencesState, preferencesReducer} from '../domains/preferences'

export interface State {
  user: UserState,
  preferences: PreferencesState
}

const reducer = combineReducers<State>({
  user: userReducer,
  preferences: preferencesReducer
})

export const createStore = (
  services: Services
) => configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    thunk: {extraArgument: {services}}
  })
})

export type Store = ReturnType<typeof createStore>

export type Dispatch = Store['dispatch']
export type GetState = Store['getState']
