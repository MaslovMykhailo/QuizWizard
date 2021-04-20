import {PreferencesSchema} from 'quiz-wizard-schema'

export interface PreferencesService {
  getPreferences: () => Promise<PreferencesSchema>
  patchPreferences: (preferences: Partial<PreferencesSchema>) => Promise<PreferencesSchema>
}
