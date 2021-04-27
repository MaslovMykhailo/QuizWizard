import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import {Services} from 'quiz-wizard-client'

import {UserState, userReducer} from '../domains/user'
import {GroupsState, groupsReduces} from '../domains/groups'
import {StudentsState, studentsReduces} from '../domains/students'
import {QuizzesState, quizzesReducer} from '../domains/quizzes'
import {AnswersState, answersReducer} from '../domains/answers'
import {PreferencesState, preferencesReducer} from '../domains/preferences'

export interface State {
  user: UserState,
  groups: GroupsState
  students: StudentsState
  quizzes: QuizzesState
  answers: AnswersState
  preferences: PreferencesState
}

const reducer = combineReducers<State>({
  user: userReducer,
  groups: groupsReduces,
  students: studentsReduces,
  quizzes: quizzesReducer,
  answers: answersReducer,
  preferences: preferencesReducer
})

export const createStore = (
  services: Services
) => configureStore({
  reducer,
  preloadedState: {
    preferences: {
      data: services.preferences.getLocalPreferences()
    }
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    thunk: {extraArgument: {services}}
  })
})

export type Store = ReturnType<typeof createStore>

export type Dispatch = Store['dispatch']
export type GetState = Store['getState']
