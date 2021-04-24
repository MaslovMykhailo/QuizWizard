import sortBy from 'lodash/sortBy'
import {createSelector} from '@reduxjs/toolkit'

import {getData, isPending, isPresent} from '../../helpers'
import type {State} from '../../store'

export const selectStudentsState = (state: State) => state.students

export const selectStudentIdsResource = createSelector(
  selectStudentsState,
  studentsState => studentsState.ids
)

export const selectStudentsData = createSelector(
  selectStudentsState,
  studentsState => studentsState.data
)

export const selectIsStudentsFetching = createSelector(
  selectStudentIdsResource,
  isPending
)

export const selectStudents = createSelector(
  selectStudentsData,
  (data) => Object.values(data).map(getData).filter(isPresent)
)

export const selectSortedStudents = createSelector(
  selectStudents,
  (students) => sortBy(students, 'firstName')
)
