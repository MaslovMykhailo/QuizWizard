import {AuthService} from './auth'
import {UserService} from './user'
import {GroupsService} from './groups'
import {StudentsService} from './students'
import {QuizzesService} from './quizzes'
import {AnswersService} from './answers'
import {PreferencesService} from './preferences'

export interface Services {
  auth: AuthService
  user: UserService
  groups: GroupsService
  students: StudentsService
  quizzes: QuizzesService
  answers: AnswersService
  preferences: PreferencesService
}
