import {UserSchema} from 'quiz-wizard-schema'

export type Tokens = {
  accessToken: string
  refreshToken?: string
}

export interface AuthPayload {
  user: UserSchema;
  tokens: Tokens
}

export interface AuthService {
  signUp: (email: string, password: string, user: UserSchema) => Promise<AuthPayload>
  signIn: (email: string, password: string) => Promise<AuthPayload>
  signOut: () => Promise<void>
  getAuthorized: () => Promise<AuthPayload | undefined>,
}
