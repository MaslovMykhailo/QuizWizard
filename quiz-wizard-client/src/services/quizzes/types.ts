import {NewQuizSchema, QuizId, QuizSchema} from 'quiz-wizard-schema'

export interface QuizzesService {
  getQuizzes: () => Promise<QuizSchema[]>
  createQuiz: (quiz: NewQuizSchema) => Promise<QuizSchema>
  getQuiz: (quizId: QuizId) => Promise<QuizSchema>
  deleteQuiz: (quizId: QuizId) => Promise<void>
}
