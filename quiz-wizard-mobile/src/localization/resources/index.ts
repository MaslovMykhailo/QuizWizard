import en from './resource.en.json'
import ua from './resource.ua.json'
import ru from './resource.ru.json'

const translations = {en, ua, ru}

export type Language = keyof typeof translations
export const languages = Object.keys(translations) as Language[]

export const resources = languages.reduce((languageResources, lng) => {
  languageResources[lng] = {translation: translations[lng]}
  return languageResources
}, {} as Record<Language, {translation: Record<string, string>}>)
