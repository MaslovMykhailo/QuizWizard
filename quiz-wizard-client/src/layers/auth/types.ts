export interface AuthLayer {
  getAccessToken: () => Promise<string | undefined>
  setAccessToken: (accessToken: string) => Promise<void>
  removeAccessToken: () => Promise<void>
  withAccessToken: <T, F extends (accessToken?: string) => T>(f: F) => Promise<T>
}