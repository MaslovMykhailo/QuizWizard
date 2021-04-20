import {PreferencesSchema} from 'quiz-wizard-schema'

export interface PreferencesService {
  getPreferences: () => Promise<PreferencesSchema>
  patchPreferences: (preferences: Partial<PreferencesSchema>) => Promise<PreferencesSchema>

  getLocalPreferences: () => Promise<PreferencesSchema>
  setLocalPreferences: (preferences: PreferencesSchema) => Promise<void>
}
