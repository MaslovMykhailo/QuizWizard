import {createContext, useContext} from 'react'
import {light, dark} from '@eva-design/material'
import {UserPreferencesStore, userPreferencesStore} from '@stores'
import {Language, languages} from '@localization'
import {Theme} from '@types'

type ThemeConfig = typeof light & typeof dark
type ThemeMap<T> = Record<Theme, T>

const themeMap: ThemeMap<ThemeConfig> = {light, dark}
const oppositeThemeMap: ThemeMap<Theme> = {light: 'dark', dark: 'light'}

type UserPreferencesContextValue = {
  store: UserPreferencesStore
  toggleTheme: () => void
  setLanguage: (lng: Language) => void
}

const UserPreferencesContext = createContext<UserPreferencesContextValue>({
  store: userPreferencesStore,
  toggleTheme: () => {
    userPreferencesStore.setTheme(oppositeThemeMap[userPreferencesStore.theme])
  },
  setLanguage: (lng) => {
    userPreferencesStore.setLanguage(lng)
  }
})

export const useUserPreferences = () => useContext(UserPreferencesContext)

export const useAppTheme = () => {
  const {store} = useUserPreferences()
  return themeMap[store.theme]
}

export const useTheme = () => {
  const {store, toggleTheme} = useUserPreferences()
  return [store.theme, toggleTheme, store.setTheme] as const
}

export const useLanguage = () => {
  const {store, setLanguage} = useUserPreferences()
  return [store.language, setLanguage, languages] as const
}

export const useUserPreferencesStatus = () => {
  const {store} = useUserPreferences()
  return [store.initializing] as const
}
