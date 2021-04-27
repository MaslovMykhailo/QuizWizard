import {createSelector} from '@reduxjs/toolkit'

import {isPending} from '../../helpers'
import type {State} from '../../store'

export const selectAnswersState = (state: State) => state.answers

export const selectAnswerIdsResource = createSelector(
  selectAnswersState,
  (state) => state.ids
)

export const selectAreAnswersFetching = createSelector(
  selectAnswerIdsResource,
  isPending
)
