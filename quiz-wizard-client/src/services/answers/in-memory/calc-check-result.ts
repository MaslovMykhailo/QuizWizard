import {AnswerChecks, QuizSchema} from 'quiz-wizard-schema'

import {calcQuestionCost, calcTotalQuestionsCost} from '../../../helpers'

export const calcCheckResult = (
  quiz: QuizSchema,
  checks: AnswerChecks
) => {
  const totalCost = calcTotalQuestionsCost(quiz)
  const actualCost = quiz.questionsOrder.reduce(
    (cost, questionId) => {
      const question = quiz.questions[questionId]
      const check = checks[questionId]
      return cost + calcQuestionCost(question, check)
    },
    0
  )
  return actualCost / totalCost
}
