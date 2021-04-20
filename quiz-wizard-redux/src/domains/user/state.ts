import {UserSchema} from 'quiz-wizard-schema'

export interface UserState {
  data?: UserSchema,
  status: {
    isAuthorized: boolean,
    isAuthorizing: boolean
  }
}
