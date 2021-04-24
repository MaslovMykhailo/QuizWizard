import {createReducer} from '@reduxjs/toolkit'

import {fulfilled, getId, pending, fulfilledResourceMap, rejected, newResourceId, deleting, getData} from '../../helpers'

import {createStudent, deleteStudent, fetchStudent, fetchStudents, fetchStudentsByGroup, updateStudent} from './actions'
import {StudentsState} from './state'

const initialState: StudentsState = {
  data: {},
  ids: {status: 'pending'}
}

export const studentsReduces = createReducer(
  initialState,
  (builder) => builder
    .addCase(
      fetchStudents.pending,
      (state) => {
        state.ids = pending(state.ids)
      }
    )
    .addCase(
      fetchStudents.fulfilled,
      (state, action) => {
        state.ids = fulfilled(state.ids, action.payload.map(getId))
        state.data = fulfilledResourceMap(state.data, action.payload)
      }
    )
    .addCase(
      fetchStudents.rejected,
      (state, action) => {
        state.ids = rejected(state.ids, action.error)
      }
    )
    .addCase(
      fetchStudentsByGroup.pending,
      (state) => {
        state.ids = pending(state.ids)
      }
    )
    .addCase(
      fetchStudentsByGroup.fulfilled,
      (state, action) => {
        const studentIds = new Set([...(getData(state.ids) ?? []), ...action.payload.map(getId)])
        state.ids = fulfilled(state.ids, Array.from(studentIds))
        state.data = fulfilledResourceMap(state.data, action.payload)
      }
    )
    .addCase(
      fetchStudentsByGroup.rejected,
      (state, action) => {
        state.ids = rejected(state.ids, action.error)
      }
    )
    .addCase(
      fetchStudent.pending,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = pending(state.data[groupId])
      }
    )
    .addCase(
      fetchStudent.fulfilled,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = fulfilled(state.data[groupId], action.payload)
      }
    )
    .addCase(
      fetchStudent.rejected,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = rejected(state.data[groupId], action.error)
      }
    )
    .addCase(
      updateStudent.pending,
      (state, action) => {
        const groupId = action.meta.arg.id
        state.data[groupId] = pending(state.data[groupId])
      }
    )
    .addCase(
      updateStudent.fulfilled,
      (state, action) => {
        const groupId = action.meta.arg.id
        state.data[groupId] = fulfilled(state.data[groupId], action.payload)
      }
    )
    .addCase(
      updateStudent.rejected,
      (state, action) => {
        const groupId = action.meta.arg.id
        state.data[groupId] = rejected(state.data[groupId], action.error)
      }
    )
    .addCase(
      createStudent.pending,
      (state) => {
        state.data[newResourceId] = pending(state.data[newResourceId])
      }
    )
    .addCase(
      createStudent.fulfilled,
      (state, action) => {
        delete state.data[newResourceId]
        state.data[action.payload.id] = fulfilled(state.data[action.payload.id], action.payload)
        state.ids.data?.push(action.payload.id)
      }
    )
    .addCase(
      createStudent.rejected,
      (state, action) => {
        state.data[newResourceId] = rejected(state.data[newResourceId], action.error)
      }
    )
    .addCase(
      deleteStudent.pending,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = deleting(state.data[groupId])
      }
    )
    .addCase(
      deleteStudent.fulfilled,
      (state, action) => {
        const groupId = action.meta.arg
        delete state.data[groupId]
        state.ids.data = state.ids.data?.filter((id) => id !== groupId)
      }
    )
    .addCase(
      deleteStudent.rejected,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = rejected(state.data[groupId], action.error)
      }
    )

)
