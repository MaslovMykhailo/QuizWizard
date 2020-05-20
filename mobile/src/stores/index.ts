import {create} from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {i18next} from '@localization'
import {QuizzesApi, RespondersApi, AnswersApi} from '@api'

import {UserStore} from './user'
import {UserPreferencesStore} from './user-preferences'
import {QuizzesStore} from './quizzes'
import {RespondersStore} from './responders'
import {AnswersStore} from './answers'

const hydrate = create({storage: AsyncStorage})

export const userStore = new UserStore()

export const userPreferencesStore = new UserPreferencesStore(i18next)
hydrate('userPreferences', userPreferencesStore).then((store) =>
  store.onHydrate()
)

export const quizzesStore = new QuizzesStore(
  new QuizzesApi(userStore.accessToken)
)

export const respondersStore = new RespondersStore(
  new RespondersApi(userStore.accessToken)
)

export const answersStore = new AnswersStore(
  new AnswersApi(userStore.accessToken),
  {
    quizzes: quizzesStore,
    responders: respondersStore
  }
)

export * from './user'
export * from './user-preferences'
export * from './quizzes'
export * from './quiz'
export * from './responders'
export * from './answers'
