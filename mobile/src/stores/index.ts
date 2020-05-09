import {create} from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {i18next} from '@localization'

import {UserStore} from './user'
import {UserPreferencesStore} from './user-preferences'

const hydrate = create({storage: AsyncStorage})

export const userStore = new UserStore()

export const userPreferencesStore = new UserPreferencesStore(i18next)
hydrate('userPreferences', userPreferencesStore).then((store) =>
  store.onHydrate()
)

export * from './user'
export * from './user-preferences'
