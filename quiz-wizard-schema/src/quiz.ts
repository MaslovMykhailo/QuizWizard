import {AnswerOption} from './answer-option'

export interface QuestionAnswer {
  text: string
  correct?: boolean
}

export type QuestionId = string

export interface QuestionSchema {
  id: QuestionId
  text: string
  picture?: string
  answers: Partial<Record<AnswerOption, QuestionAnswer>>
  partialAnswer?: boolean
  cost: number
}

export type QuizId = string

export interface QuizSchema {
  id: QuizId
  creationDate: string
  name: string
  description?: string
  questions: Record<QuestionId, QuestionSchema>
  questionsOrder: QuestionId[]
}

export interface NewQuestionSchema extends Omit<QuestionSchema, 'picture'> {
  picture?: Blob
}

export interface NewQuizSchema extends Omit<QuizSchema, 'creationDate' | 'questions'> {
  questions: Record<QuestionId, NewQuestionSchema>
}
