import {AnswerId, AnswerSchema} from 'quiz-wizard-schema'

import {Resource} from '../../helpers'

export interface AnswersState {
  ids: Resource<AnswerId[]>
  data: Record<AnswerId, Resource<AnswerSchema> | undefined>
}
