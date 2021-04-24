export const Path = {
  root: () => '/',

  signIn: () => '/signIn',
  signUp: () => '/signUp',

  account: () => '/account',
  dashboard: () => '/dashboard',

  students: () => '/students',
  newStudent: () => '/students/new',
  student: (studentId?: string) => studentId ?
    `/students/${studentId}`:
    '/students/:studentId',

  groups: () => '/groups',
  newGroup: () => '/groups/new',
  group: (groupId?: string) => groupId ?
    `/groups/${groupId}`:
    '/groups/:groupId',

  quizzes: () => '/quizzes',

  answers: () => '/answers',

  analytics: () => '/analytics'
}
