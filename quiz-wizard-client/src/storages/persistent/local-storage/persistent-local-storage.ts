import {PersistentStorage} from '../types'

const buildKey = (prefix: string, key: string) => `[${prefix}]:${key}`

export const createPersistentStorageFromLocalStorage = (
  prefix = 'quiz-wizard'
): PersistentStorage => ({
  setData: async <T>(key: string, data: T) => {
    localStorage.setItem(buildKey(prefix, key), JSON.stringify(data)) 
  },
  getData: async <T>(key: string) => {
    const rawData = localStorage.getItem(buildKey(prefix, key))
    return rawData ? JSON.parse(rawData) as T : undefined 
  },
  removeData: async (key: string) => {
    localStorage.removeItem(buildKey(prefix, key))
  }  
})