import {PersistentStorage} from '../../../storages/persistent'
import {NotAuthorizedError} from '../errors'
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

  const withAccessToken = async <T>(f: (accessToken: string) => Promise<T>) => {
    const token = await getAccessToken()

    if (!token) {
      return Promise.reject(new NotAuthorizedError())
    }

    return f(token)
  }

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    withAccessToken
  }
}
