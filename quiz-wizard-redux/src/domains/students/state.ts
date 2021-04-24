import {StudentId, StudentSchema} from 'quiz-wizard-schema'

import {Resource} from '../../helpers'

export interface StudentsState {
  ids: Resource<StudentId[]>
  data: Record<StudentId, Resource<StudentSchema> | undefined>
}
