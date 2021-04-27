import {QuizId, QuizSchema} from 'quiz-wizard-schema'

import {Resource} from '../../helpers'

export interface QuizzesState {
  ids: Resource<QuizId[]>
  data: Record<QuizId, Resource<QuizSchema> | undefined>
}
