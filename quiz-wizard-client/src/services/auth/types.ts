export type Tokens = {
  accessToken: string
  refreshToken?: string
}

export interface AuthPayload<UserData> {
  userData: UserData;
  tokens: Tokens
}

export interface AuthService<UserData> {
  signUp: (email: string, password: string, userData: UserData) => Promise<AuthPayload<UserData>>
  signIn: (email: string, password: string) => Promise<AuthPayload<UserData>>
  signOut: () => Promise<void>
  getAuthorized: () => Promise<AuthPayload<UserData> | undefined>
}