import {GroupId, StudentId, StudentSchema} from 'quiz-wizard-schema'

export interface StudentsListProps {
  students: StudentSchema[]
  onClick: (studentId: StudentId) => void
  onDelete: (studentId: StudentId) => void
  getGroupName: (groupId: GroupId) => string
}

export function StudentsList() {
  return null
}
