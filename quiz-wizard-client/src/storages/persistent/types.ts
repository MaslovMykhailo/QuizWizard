export interface PersistentStorage {
  setData: <T>(key: string, data: T) => Promise<void>
  getData: <T>(key: string) => Promise<T | undefined>
  removeData: (key: string) => Promise<void>
}