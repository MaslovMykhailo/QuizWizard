import {AnswerOption} from './answer-option'

export interface QuestionAnswer {
  text: string
  correct: boolean
  cost: number
}

export type QuestionId = string

export interface QuestionSchema {
  id: QuestionId
  text: string
  picture?: string
  answers: Record<AnswerOption, QuestionAnswer>
  partialAnswer: boolean
}

export type QuizId = string

export interface QuizSchema {
  id: QuizId
  creationDate: Date
  name: string
  description?: string
  questions?: Record<QuestionId, QuestionSchema>
  questionsOrder: QuestionId[]
}
