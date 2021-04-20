export interface AuthLayer {
  getAccessToken: () => Promise<string | undefined>
  setAccessToken: (accessToken: string) => Promise<void>
  removeAccessToken: () => Promise<void>
  withAccessToken: <T>(f: (accessToken: string) => Promise<T>) => Promise<T>
}
