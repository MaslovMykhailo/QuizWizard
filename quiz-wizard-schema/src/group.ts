import {StudentId} from './student'

export type GroupId = string

export interface GroupSchema {
  id: GroupId
  name: string
  description?: string
  students?: StudentId[]
}

export type NewGroupSchema = Omit<GroupSchema, 'id'>
