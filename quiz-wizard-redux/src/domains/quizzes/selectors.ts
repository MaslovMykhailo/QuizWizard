import {createSelector} from '@reduxjs/toolkit'

import {isPending} from '../../helpers'
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
