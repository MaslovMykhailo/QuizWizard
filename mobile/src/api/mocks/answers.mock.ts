import {Answer} from '@types'

export const answers: Answer[] = [
  {
    id: '1',
    name: 'Result 1',
    quizId: '1',
    answers: [['A'], ['B', 'C'], ['D'], [], ['E', 'A', 'C']],
    creationDate: new Date(),
    responderId: '123'
  },
  {
    id: '2',
    name: 'Result 2',
    quizId: '2',
    answers: [['A'], ['B'], ['C', 'D'], [], ['E', 'C', 'A']],
    creationDate: new Date('2012-10-10')
  }
]
