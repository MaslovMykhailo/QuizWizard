import {createSelector} from '@reduxjs/toolkit'
import {GroupId, QuizId} from 'quiz-wizard-schema'

import {selectAnswers, selectAreAnswersFetching} from '../answers'
import {selectAreGroupsFetching, selectGroupGetter, selectIsStudentInGroupGetter, selectSortedGroups} from '../groups'
import {selectAreQuizzesFetching, selectQuizzes} from '../quizzes'
import {selectAreStudentsFetching, selectSortedStudentsByGroupGetter} from '../students'

export const selectIsAnyResourceFetching = createSelector(
  selectAreStudentsFetching,
  selectAreGroupsFetching,
  selectAreQuizzesFetching,
  selectAreAnswersFetching,
  (studentsFetching, groupsFetching, quizzesFetching, answersFetching) =>
    studentsFetching || groupsFetching || quizzesFetching ||answersFetching
)

export const selectGroupsAnalyticByQuizzes = createSelector(
  selectSortedGroups,
  selectQuizzes,
  selectAnswers,
  selectIsStudentInGroupGetter,
  (groups, quizzes, answers, isStudentInGroup) => groups
    .map((group) => {
      const quizzesAnalytics = quizzes.reduce<Record<QuizId, {answersCount: number, averageResult: number}>>(
        (analytics, quiz) => {
          const answersByQuiz = answers.filter(
            (answer) => answer.quiz === quiz.id && isStudentInGroup(group.id, answer.student)
          )

          const answersCount = answersByQuiz.length

          if (answersCount) {
            const averageResult = answersByQuiz.reduce(
              (result, answer) => result + answer.result,
              0
            ) / answersCount

            analytics[quiz.id] = {
              answersCount,
              averageResult
            }
          }

          return analytics
        },
        {}
      )

      const totalAnswersCount = Object.values(quizzesAnalytics)
        .reduce((count, analytic) => analytic.answersCount + count, 0)

      const averageResult = totalAnswersCount ?
        Object.values(quizzesAnalytics)
          .reduce((result, analytic) => analytic.averageResult + result, 0) /
          Object.keys(quizzesAnalytics).length :
        undefined

      return {
        quizzesAnalytics,
        totalAnswersCount,
        averageResult,
        group
      }
    })
)

export const selectGroupAnalyticsGetter = createSelector(
  selectQuizzes,
  selectAnswers,
  selectSortedStudentsByGroupGetter,
  (quizzes, answers, getStudents) => (groupId: GroupId) => getStudents(groupId)
    .map((student) => {
      const studentAnswers = answers.filter(
        (answer) => answer.student === student.id
      )

      const studentQuizzes = quizzes.filter(
        (quiz) => studentAnswers.some((answer) => answer.quiz === quiz.id)
      )

      const studentResults = studentQuizzes.reduce<Record<QuizId, number | undefined>>(
        (results, quiz) => {
          const bestResult = Math.max(...studentAnswers
            .filter((answer) => answer.quiz === quiz.id)
            .map((answer) => answer.result)
          )
          results[quiz.id] = Number.isFinite(bestResult) ? bestResult : undefined
          return results
        },
        {}
      )

      const averageResult = Object.keys(studentResults).length ?
        Object.values(studentResults).reduce<number>(
          (sum, result) => sum + (result ?? 0),
          0
        ) / Object.keys(studentResults).length :
        undefined

      return {
        student,
        studentResults,
        averageResult
      }
    })
)
