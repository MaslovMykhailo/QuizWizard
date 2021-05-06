import {QuizSchema, AnswerChecks, AnswerOption} from 'quiz-wizard-schema'

const getIndexOfOption = (option: string) =>
  option.charCodeAt(0) - 65

export const checkQuizAnswers = (
  quiz: QuizSchema,
  answers: number[][]
): AnswerChecks => {
  return quiz.questionsOrder.reduce<AnswerChecks>(
    (checks, questionId, index) => {
      const question = quiz.questions[questionId]

      checks[questionId] = Object
        .entries(question.answers)
        .reduce<Partial<Record<AnswerOption, boolean>>>(
          (check, [option, answer]) => {
            if (answer) {
              const bubbled = Boolean(answers[index][getIndexOfOption(option)])
              check[option as AnswerOption] = bubbled ? Boolean(answer.correct) : undefined
            }
            return check
          },
          {}
        )

      return checks
    },
    {}
  )
}
