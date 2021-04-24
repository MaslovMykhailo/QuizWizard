import type {GroupId, NewStudentSchema, StudentId, StudentSchema} from 'quiz-wizard-schema'

export interface StudentsService {
  getStudent: (studentId: StudentId) => Promise<StudentSchema | undefined>
  updateStudent: (studentId: StudentId, student: Partial<StudentSchema>) => Promise<StudentSchema>
  createStudent: (student: NewStudentSchema) => Promise<StudentSchema>
  deleteStudent: (studentId: StudentId) => Promise<void>
  getStudents: () => Promise<StudentSchema[]>
  getStudentsByGroup: (groupId: GroupId) => Promise<StudentSchema[]>
}
