import sortBy from 'lodash/sortBy'
import flow from 'lodash/flow'
import {createSelector} from '@reduxjs/toolkit'
import {StudentId} from 'quiz-wizard-schema'

import {getData, isDeleting, isPending, isPresent, newResourceId} from '../../helpers'
import type {State} from '../../store'

export const selectStudentsState = (state: State) => state.students

export const selectStudentIdsResource = createSelector(
  selectStudentsState,
  (studentsState) => studentsState.ids
)

export const selectStudentIds = createSelector(
  selectStudentIdsResource,
  getData
)

export const selectStudentsData = createSelector(
  selectStudentsState,
  (studentsState) => studentsState.data
)

export const selectAreStudentsFetching = createSelector(
  selectStudentIdsResource,
  isPending
)

export const selectStudentResources = createSelector(
  selectStudentsData,
  (data) => Object.values(data).filter(isPresent)
)

export const selectStudents = createSelector(
  selectStudentResources,
  (resources) => resources.map(getData).filter(isPresent)
)

export const selectSortedStudents = createSelector(
  selectStudents,
  (students) => sortBy(students, 'firstName')
)

export const selectStudentsInfo = createSelector(
  selectStudentResources,
  (resources) => resources.map((resource) => getData(resource) && ({
    ...getData(resource)!,
    isFetching: isPending(resource),
    isDeleting: isDeleting(resource)
  }))
    .filter(isPresent)
)

export const selectSortedStudentsInfo = createSelector(
  selectStudentsInfo,
  (studentsInfo) => sortBy(studentsInfo, 'firstName')
)

export const selectStudentResourceGetter = createSelector(
  selectStudentsData,
  (data) => (studentId: StudentId) => data[studentId]
)

export const selectIsStudentFetchingGetter = createSelector(
  selectStudentResourceGetter,
  (resourceGetter) => flow(resourceGetter, isPending)
)

export const selectIsStudentDeletingGetter = createSelector(
  selectStudentResourceGetter,
  (resourceGetter) => flow(resourceGetter, isDeleting)
)

export const selectStudentGetter = createSelector(
  selectStudentResourceGetter,
  (resourceGetter) => flow(resourceGetter, getData)
)

export const selectStudentInfoGetter = createSelector(
  selectStudentGetter,
  selectIsStudentFetchingGetter,
  selectIsStudentDeletingGetter,
  (studentGetter, isFetchingGetter, isDeletingGetter) =>
    flow(studentGetter, (student) => student && {
      ...student,
      isFetching: isFetchingGetter(student.id),
      isDeleting: isDeletingGetter(student.id)
    })
)

export const selectNewStudentResource = createSelector(
  selectStudentsData,
  (data) => data[newResourceId]
)

export const selectIsNewStudentCreating = createSelector(
  selectNewStudentResource,
  isPending
)

export const selectIsNoGroupStudentGetter = createSelector(
  selectStudentGetter,
  (studentGetter) => flow(studentGetter, (student) => !student?.groups?.length)
)
