import {createPersistentAuthLayer} from './layers'
import {createPersistentStorageFromLocalStorage} from './storages'
import {
  Services,
  createInMemoryAuthService,
  createInMemoryPreferencesService,
  createInMemoryUserService
} from './services'

const persistentStorage = createPersistentStorageFromLocalStorage()

const persistentAuthLayer = createPersistentAuthLayer(persistentStorage)

export const createInMemoryServices = (): Services => ({
  auth: createInMemoryAuthService(persistentAuthLayer, persistentStorage),
  user: createInMemoryUserService(persistentAuthLayer, persistentStorage),
  preferences: createInMemoryPreferencesService(persistentAuthLayer, persistentStorage)
})
