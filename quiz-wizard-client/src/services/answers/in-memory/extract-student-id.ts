export const extractStudentId = (student: number[][]) => {
  const studentId = Array(5).fill(-1)
    .map((_, index) => student[index].findIndex((q) => q === 1))

  if (studentId.some((n) => n !== -1)) {
    return studentId.map((n) => n === -1 ? 0 : n).join('')
  }
}
