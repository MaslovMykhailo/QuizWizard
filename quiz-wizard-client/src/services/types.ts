import {AuthService} from './auth'
import {UserService} from './user'
import {PreferencesService} from './preferences'

export interface Services {
  auth: AuthService
  user: UserService
  preferences: PreferencesService
}
