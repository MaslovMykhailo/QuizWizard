import {AnswerOption, QuestionSchema, QuizSchema} from 'quiz-wizard-schema'

export const calcTotalQuestionsCost = (quiz: QuizSchema) => Object
  .values(quiz.questions)
  .reduce(
    (totalCost, {cost}) => totalCost + Math.max(1, cost),
    0
  )

export const calcQuestionCost = (
  question: QuestionSchema,
  checks: Partial<Record<AnswerOption, boolean>>
) => {
  const cost = Math.max(1, question.cost)

  if (question.partialAnswer) {
    const {
      correctCount,
      incorrectCount,
      totalCorrectCount
    } = Object.entries(question.answers).reduce(
      (counts, [option, answer]) => {
        const marked = checks[option as AnswerOption]

        if (answer?.correct) {
          counts.totalCorrectCount++
          marked === true && counts.correctCount++
        } else {
          marked === false && counts.incorrectCount++
        }

        return counts
      },
      {
        correctCount: 0,
        incorrectCount: 0,
        totalCorrectCount: 0
      }
    )

    if (!totalCorrectCount) {
      return 0
    }

    return cost * Math.max(correctCount - incorrectCount, 0) / totalCorrectCount
  } else {
    const allCorrect = !Object
      .entries(question.answers)
      .some(([option, answer]) => {
        const marked = checks[option as AnswerOption]
        return answer?.correct ? !marked : marked
      })

    return allCorrect ? cost : 0
  }
}
