import {UUID} from './uuid'
import {ResponderId} from './responder'
import {AnswerOptions} from './answer-options'

export type Answer = {
  id: UUID
  name: string
  answers: AnswerOptions[]
  pictureUrl?: string
  quizId: UUID
  responderId?: ResponderId
  creationDate: Date
}
