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
  newQuiz: (originQuizId?: string) => originQuizId ?
    `/quizzes/new?origin=${originQuizId}` :
    '/quizzes/new' ,
  quiz: (quizId?: string) => quizId ?
    `/quizzes/${quizId}`:
    '/quizzes/:quizId',

  answers: () => '/answers',
  newAnswer: (quizId?: string) => quizId ?
    `/answers/new?quiz=${quizId}` :
    '/answers/new',
  answer: (answerId?: string) => answerId ?
    `/answers/${answerId}` :
    '/answers/:answerId',

  analytics: (type?: string, id?: string) => type ?
    id ? `/analytics?type=${type}&id=${id}` : `/analytics?type=${type}` :
    '/analytics'

}
