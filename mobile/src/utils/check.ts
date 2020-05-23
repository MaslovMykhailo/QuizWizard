import {Quiz, AnswerOptions, QuizResult, CheckedAnswerOptions} from '@types'

/**
 * @Note
 * @param grade equals
 * {count of correct answer options} / {common count of answer options}
 */

export const checkQuiz = (
  {answers: correctAnswers}: Quiz,
  answers: AnswerOptions[]
): QuizResult => {
  const checkedOptions: CheckedAnswerOptions[] = answers.map(
    (options, answerIndex) =>
      options.map((option) => {
        if (correctAnswers[answerIndex].includes(option)) {
          return {
            option,
            correct: true
          }
        } else {
          return {
            option,
            correct: false
          }
        }
      })
  )

  const currentGrade = checkedOptions.reduce(
    (grade, options) =>
      grade + options.filter((option) => option.correct).length,
    0
  )

  const maxGrade = correctAnswers.reduce(
    (grade, options) => grade + options.length,
    0
  )

  return {
    grade: currentGrade / maxGrade,
    options: checkedOptions
  }
}
