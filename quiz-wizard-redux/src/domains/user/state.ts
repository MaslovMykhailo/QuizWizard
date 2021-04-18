import {UserSchema} from 'quiz-wizard-schema'

export interface NonAuthorizedUserState {
  status: {
    isAuthorized: false,
    isAuthorizing: boolean
  }
}

export interface UserState {
  data?: UserSchema,
  status: {
    isAuthorized: boolean,
    isAuthorizing: boolean
  }
}
