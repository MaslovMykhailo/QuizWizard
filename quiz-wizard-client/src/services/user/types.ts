import {UserSchema} from 'quiz-wizard-schema'

export interface UserService {
  getUserData: () => Promise<UserSchema>
  updateUserData: (userData: Partial<UserSchema>) => Promise<UserSchema>
}
