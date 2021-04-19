import {createPersistentAuthLayer} from './layers'
import {createInMemoryAuthService, Services} from './services'
import {createPersistentStorageFromLocalStorage} from './storages'

const persistentStorage = createPersistentStorageFromLocalStorage()

const persistentAuthLayer = createPersistentAuthLayer(persistentStorage)

export const createInMemoryServices = (): Services => ({
  auth: createInMemoryAuthService(persistentAuthLayer)
})
