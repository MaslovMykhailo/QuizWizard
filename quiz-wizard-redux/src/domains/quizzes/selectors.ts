import sortBy from 'lodash/sortBy'
import {createSelector} from '@reduxjs/toolkit'

import {getData, isDeleting, isPending, isPresent} from '../../helpers'
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
  (quizzes) => sortBy(quizzes, (quiz) => new Date(quiz.creationDate))
)
