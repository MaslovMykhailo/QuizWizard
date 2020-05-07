import {create} from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {i18next} from '@localization'

import {UserPreferences} from './user-preferences'

const hydrate = create({storage: AsyncStorage})

export const userPreferencesStore = new UserPreferences(i18next)
hydrate('userPreferences', userPreferencesStore).then((store) =>
  store.onHydrate()
)

export * from './user-preferences'
