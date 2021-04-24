import {createPersistentAuthLayer} from './layers'
import {createPersistentStorageFromLocalStorage} from './storages'
import {
  Services,
  createInMemoryAuthService,
  createInMemoryUserService,
  createInMemoryGroupsService,
  createInMemoryStudentsService,
  createInMemoryPreferencesService
} from './services'

const persistentStorage = createPersistentStorageFromLocalStorage()

const persistentAuthLayer = createPersistentAuthLayer(persistentStorage)

export const createInMemoryServices = (): Services => ({
  auth: createInMemoryAuthService(persistentAuthLayer, persistentStorage),
  user: createInMemoryUserService(persistentAuthLayer, persistentStorage),
  groups: createInMemoryGroupsService(persistentAuthLayer, persistentStorage),
  students: createInMemoryStudentsService(persistentAuthLayer, persistentStorage),
  preferences: createInMemoryPreferencesService(persistentAuthLayer, persistentStorage)
})
