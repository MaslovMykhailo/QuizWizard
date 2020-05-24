import {AnswerOption} from './answer-options'

export type CheckedAnswerOption = {
  option: AnswerOption
  correct?: boolean
  missed?: boolean
}

export type CheckedAnswerOptions = Array<CheckedAnswerOption>

export type QuizResult = {
  grade: number
  options: CheckedAnswerOptions[]
}
