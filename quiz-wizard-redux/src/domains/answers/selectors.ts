import sortBy from 'lodash/sortBy'
import {createSelector} from '@reduxjs/toolkit'
import {AnswerSchema, GroupSchema, StudentSchema} from 'quiz-wizard-schema'

import {getData, isPending, isPresent} from '../../helpers'
import {selectIsStudentInGroupGetter, selectSortedGroups} from '../groups'
import {selectIsNoGroupStudentGetter, selectStudentGetter} from '../students'
import {selectSortedQuizzes} from '../quizzes'
import type {State} from '../../store'

export const selectAnswersState = (state: State) => state.answers

export const selectAnswerIdsResource = createSelector(
  selectAnswersState,
  (state) => state.ids
)

export const selectAnswersData = createSelector(
  selectAnswersState,
  (state) => state.data
)

export const selectAreAnswersFetching = createSelector(
  selectAnswerIdsResource,
  isPending
)

export const selectAnswers = createSelector(
  selectAnswersData,
  (data) => Object.values(data).map(getData).filter(isPresent)
)

export const selectSortedAnswers = createSelector(
  selectAnswers,
  (answers) => sortBy(answers, (answer) => new Date(answer.creationDate)).reverse()
)

export const selectAnswersByQuizzes = createSelector(
  selectSortedQuizzes,
  selectSortedGroups,
  selectSortedAnswers,
  selectStudentGetter,
  selectIsStudentInGroupGetter,
  selectIsNoGroupStudentGetter,
  (quizzes, groups, answers, getStudent, isStudentInGroup, isNoGroupStudent) => quizzes
    .map((quiz) => ({
      quiz,
      answers: answers.filter(
        (answer) => answer.quiz === quiz.id
      )
    }))
    .map((answersByQuiz) => ({
      quiz: answersByQuiz.quiz,
      answersByGroup: groups
        .map<{
          group?: GroupSchema,
          answers: Array<{answer: AnswerSchema, student?: StudentSchema}>
        }>((group) => ({
          group,
          answers: answersByQuiz.answers
            .filter((answer) => isStudentInGroup(group.id, answer.student))
            .map((answer) => ({
              answer,
              student: answer.student ? getStudent(answer.student) : undefined
            }))
        }))
        .concat({
          answers: answersByQuiz.answers
            .filter((answer) => !answer.student || isNoGroupStudent(answer.student))
            .map((answer) => ({answer}))
        })
        .filter(({answers}) => answers.length)
    }))
)
