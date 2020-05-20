import {UUID} from './uuid'
import {AnswerOptions} from './answer-options'

export type Quiz = {
  id: UUID
  name: string
  answers: AnswerOptions[]
  creationDate: Date
}
