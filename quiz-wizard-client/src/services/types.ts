import {AuthService} from './auth'
import {UserService} from './user'
import {GroupsService} from './groups'
import {StudentsService} from './students'
import {PreferencesService} from './preferences'
import {QuizzesService} from './quizzes'

export interface Services {
  auth: AuthService
  user: UserService
  groups: GroupsService
  students: StudentsService
  quizzes: QuizzesService
  preferences: PreferencesService
}
