import type {GroupId} from './group'

export type StudentId = string

export interface StudentSchema {
  id: StudentId
  firstName: string
  lastName: string
  groups?: GroupId[]
}

export type NewStudentSchema = Omit<StudentSchema, 'id'>
