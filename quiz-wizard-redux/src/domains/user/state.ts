import {SerializedError} from '@reduxjs/toolkit'
import {UserSchema} from 'quiz-wizard-schema'

export interface UserState {
  data?: UserSchema
  error?: SerializedError
  status: {
    isAuthorized?: boolean
    isAuthorizing?: boolean
    isSigningOut?: boolean
    isUpdating?: boolean
    isFetching?: boolean
  }
}
