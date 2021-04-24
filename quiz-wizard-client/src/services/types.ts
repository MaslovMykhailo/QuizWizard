import {AuthService} from './auth'
import {UserService} from './user'
import {GroupsService} from './groups'
import {StudentsService} from './students'
import {PreferencesService} from './preferences'

export interface Services {
  auth: AuthService
  user: UserService
  groups: GroupsService
  students: StudentsService
  preferences: PreferencesService
}
