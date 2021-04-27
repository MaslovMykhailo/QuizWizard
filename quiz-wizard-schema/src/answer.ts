import {AnswerOption} from './answer-option'
import {QuestionId, QuizId} from './quiz'
import {StudentId} from './student'

export type AnswerId = string

export type AnswerChecks = Record<QuestionId, Partial<Record<AnswerOption, boolean>>>

export interface AnswerSchema {
  id: AnswerId
  quiz: QuizId
  student?: StudentId
  creationDate: Date
  sheet: string
  result: number
  checks: AnswerChecks
}
