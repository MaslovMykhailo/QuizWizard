import {createPersistentStorageFromLocalStorage} from './storages'
import {
  createPersistentAuthLayer,
  createRecognitionLayer,
  createUploadLayer
} from './layers'
import {
  Services,
  createInMemoryAuthService,
  createInMemoryUserService,
  createInMemoryGroupsService,
  createInMemoryStudentsService,
  createInMemoryAnswersService,
  createInMemoryQuizzesService,
  createInMemoryPreferencesService
} from './services'

const persistentStorage = createPersistentStorageFromLocalStorage()

const persistentAuthLayer = createPersistentAuthLayer(persistentStorage)
const recognitionLayer = createRecognitionLayer()
const uploadLayer = createUploadLayer()

export const createInMemoryServices = (): Services => ({
  auth: createInMemoryAuthService(persistentAuthLayer, persistentStorage),
  user: createInMemoryUserService(persistentAuthLayer, persistentStorage),
  groups: createInMemoryGroupsService(persistentAuthLayer, persistentStorage),
  students: createInMemoryStudentsService(persistentAuthLayer, persistentStorage),
  quizzes: createInMemoryQuizzesService(persistentAuthLayer, uploadLayer, persistentStorage),
  answers: createInMemoryAnswersService(persistentAuthLayer, uploadLayer, recognitionLayer, persistentStorage),
  preferences: createInMemoryPreferencesService(persistentAuthLayer, persistentStorage)
})
