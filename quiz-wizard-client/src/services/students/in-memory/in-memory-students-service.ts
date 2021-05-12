import merge from 'lodash/merge'
import {GroupId, NewStudentSchema, StudentSchema} from 'quiz-wizard-schema'

import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {delayMethods} from '../../../helpers'
import {StudentsService} from '../types'

import {initialData} from './initial-data'

const numToStudentId = (num: number) => {
  const baseId = '00000'
  const strNum = String(num)
  return baseId.substring(0, baseId.length - strNum.length) + strNum
}

const getStudentId = (ids: string[]) => {
  const numIds = ids
    .map((id) => parseInt(id))
    .filter((num) => Number.isFinite(num) && num >= 0)
    .sort((i1, i2) => i1 - i2)

  if (!numIds.length || numIds[0] !== 0) {
    return numToStudentId(0)
  }

  for (let i = 0; i < numIds.length; i++) {
    if (
      i === numIds.length - 1 ||
      numIds[i] + 1 !== numIds[i + 1]
    ) {
      return numToStudentId(numIds[i] + 1)
    }
  }

  throw new Error('Cannot get student id')
}

export const createInMemoryStudentsService = (
  authLayer: AuthLayer,
  storage: PersistentStorage,
  inMemoryStudentsStorageKey = 'in-memory-students',
  latency = 750
): StudentsService => {
  let inMemoryStudents = {...initialData}

  const syncStudentsWithStorage = (override = false) => storage
    .getData<typeof inMemoryStudents>(inMemoryStudentsStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryStudentsStorageKey,
        inMemoryStudents = override ? inMemoryStudents : merge(data, inMemoryStudents)
      )
    )

  syncStudentsWithStorage()

  const getStudent = (studentId: GroupId) => syncStudentsWithStorage()
    .then(() => authLayer.withAccessToken(async () => inMemoryStudents[studentId]))

  const updateStudent = (studentId: GroupId, student: Partial<StudentSchema>) =>
    authLayer.withAccessToken(() => {
      inMemoryStudents[studentId] = {...inMemoryStudents[studentId], ...student}
      return syncStudentsWithStorage().then(() => inMemoryStudents[studentId])
    })

  const createStudent = (student: NewStudentSchema) => syncStudentsWithStorage()
    .then(() => {
      const studentId = getStudentId(Object.keys(inMemoryStudents))
      return updateStudent(studentId, {...student, id: studentId})
    })

  const deleteStudent = (studentId: GroupId) =>
    authLayer.withAccessToken(() => {
      delete inMemoryStudents[studentId]
      return syncStudentsWithStorage(true)
    })

  const getStudents = () => syncStudentsWithStorage()
    .then(() => Object.values(inMemoryStudents))

  const getStudentsByGroup = (groupId: GroupId) => getStudents()
    .then((students) => students.filter(({groups}) => groups?.includes(groupId)))

  return delayMethods(
    {
      getStudent,
      updateStudent,
      createStudent,
      deleteStudent,
      getStudents,
      getStudentsByGroup
    },
    latency
  )
}
