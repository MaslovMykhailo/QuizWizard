import {UUID} from './uuid'
import {Answer} from './answer'

export type Quiz = {
  id: UUID
  name: string
  answers: Answer[]
  creationDate: Date
}
