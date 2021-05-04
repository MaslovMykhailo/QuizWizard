import flow from 'lodash/flow'
import sortBy from 'lodash/sortBy'
import {createSelector} from '@reduxjs/toolkit'
import {QuizId} from 'quiz-wizard-schema'

import {getData, isCreating, isDeleting, isPending, isPresent} from '../../helpers'
import type {State} from '../../store'

export const selectQuizzesState = (state: State) => state.quizzes

export const selectQuizIdsResource = createSelector(
  selectQuizzesState,
  (state) => state.ids
)

export const selectAreQuizzesFetching = createSelector(
  selectQuizIdsResource,
  isPending
)

export const selectQuizzesData = createSelector(
  selectQuizzesState,
  (state) => state.data
)

export const selectQuizResources = createSelector(
  selectQuizzesData,
  (data) => Object.values(data).filter(isPresent)
)

export const selectQuizzes = createSelector(
  selectQuizResources,
  (resources) => resources.map(getData).filter(isPresent)
)

export const selectSortedQuizzes = createSelector(
  selectQuizzes,
  (quizzes) => sortBy(quizzes, (quiz) => new Date(quiz.creationDate)).reverse()
)

export const selectQuizzesInfo = createSelector(
  selectQuizResources,
  (resources) => resources
    .map((resource) => getData(resource) && ({
      ...getData(resource)!,
      isDeleting: isDeleting(resource),
      isFetching: isPending(resource)
    }))
    .filter(isPresent)
)

export const selectSortedQuizzesInfo = createSelector(
  selectQuizzesInfo,
  (quizzes) => sortBy(quizzes, (quiz) => new Date(quiz.creationDate)).reverse()
)

export const selectQuizResourceGetter = createSelector(
  selectQuizzesData,
  (data) => (quizId: QuizId) => data[quizId]
)

export const selectQuizGetter = createSelector(
  selectQuizResourceGetter,
  (getResource) => flow(getResource, getData)
)

export const selectIsQuizCreatingGetter = createSelector(
  selectQuizResourceGetter,
  (getResource) => flow(getResource, isCreating)
)

export const selectIsQuizFetchingGetter = createSelector(
  selectQuizResourceGetter,
  (getResource) => flow(getResource, isPending)
)

export const selectIsQuizDeletingGetter = createSelector(
  selectQuizResourceGetter,
  (getResource) => flow(getResource, isDeleting)
)
