import {GroupId, NewStudentSchema, StudentId, StudentSchema} from 'quiz-wizard-schema'

import {createAsyncThunkAction} from '../../common'

export const fetchStudents = createAsyncThunkAction(
  'FetchStudents',
  (_, {extra: {services}}) =>
    services.students.getStudents()
)

export const fetchStudentsByGroup = createAsyncThunkAction(
  'FetchStudentsByGroup',
  (groupId: GroupId, {extra: {services}}) =>
    services.students.getStudentsByGroup(groupId)
)

export const fetchStudent = createAsyncThunkAction(
  'FetchStudent',
  (studentId: StudentId, {extra: {services}}) =>
    services.students.getStudent(studentId)
)

export const updateStudent = createAsyncThunkAction(
  'UpdateStudent',
  (student: StudentSchema, {extra: {services}}) =>
    services.students.updateStudent(student.id, student)
)

export const createStudent = createAsyncThunkAction(
  'CreateStudent',
  (student: NewStudentSchema, {extra: {services}}) =>
    services.students.createStudent(student)
)

export const deleteStudent = createAsyncThunkAction(
  'DeleteStudent',
  (studentId: StudentId, {extra: {services}}) =>
    services.students.deleteStudent(studentId)
)

