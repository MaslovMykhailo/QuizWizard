import {AnswerId, AnswerSchema, QuizId} from 'quiz-wizard-schema'

export interface AnswersService {
  getAnswers: () => Promise<AnswerSchema[]>
  checkQuiz: (quizId: QuizId, sheet: string | Blob) => Promise<AnswerSchema>
  getAnswer: (answerId: AnswerId) => Promise<AnswerSchema>
  deleteAnswer: (answerId: AnswerId) => Promise<void>
}
