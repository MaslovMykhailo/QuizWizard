import {AuthService} from './auth'
import {PreferencesService} from './preferences'

export interface Services {
  auth: AuthService
  preferences: PreferencesService
}
