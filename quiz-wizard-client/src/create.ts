import {createPersistentAuthLayer} from './layers'
import {createInMemoryAuthService, Services} from './services'
import {createPersistentStorageFromLocalStorage} from './storages'

const persistentAuthLayer = createPersistentAuthLayer(
  createPersistentStorageFromLocalStorage()
)

export const createInMemoryServices = (): Services => ({
  auth: createInMemoryAuthService(persistentAuthLayer)
})
