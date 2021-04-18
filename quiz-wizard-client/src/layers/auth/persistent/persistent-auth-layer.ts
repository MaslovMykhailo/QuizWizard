import {PersistentStorage} from '../../../storages/persistent'
import {AuthLayer} from '../types'

export const createPersistentAuthLayer = (
  persistentStorage: PersistentStorage,
  storageKey = 'auth'
): AuthLayer => {
  const getAccessToken = () =>
    persistentStorage.getData<string>(storageKey)

  const setAccessToken = (accessToken: string) =>
    persistentStorage.setData<string>(storageKey, accessToken)

  const removeAccessToken = () =>
    persistentStorage.removeData(storageKey)

  const withAccessToken = <T, F extends (accessToken?: string) => T>(f: F) =>
    getAccessToken().then(f)

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    withAccessToken
  }
}
