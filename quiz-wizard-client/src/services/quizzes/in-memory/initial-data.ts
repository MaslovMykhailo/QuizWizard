import {QuizId, QuizSchema} from 'quiz-wizard-schema'

export const initialData: Record<QuizId, QuizSchema> = {
  '32742e94-1f1e-4301-8482-8835ce7e3696': {
    id: '32742e94-1f1e-4301-8482-8835ce7e3696',
    creationDate: new Date('01-02-2021').toISOString(),
    name: 'First quiz',
    description: 'My first quiz',
    questionsOrder: [
      '070fab1c-e660-457a-8d26-77fb2284555a',
      '3c481c1d-d52f-4432-8a3c-1b773ea2613c',
      'a699dfa5-26bb-40a1-8a80-c55be3840d82'
    ],
    questions: {
      '070fab1c-e660-457a-8d26-77fb2284555a': {
        id: '070fab1c-e660-457a-8d26-77fb2284555a',
        text: '2 + 2',
        picture: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2plus2-1596824542.jpg',
        cost: 1,
        answers: {
          A: {text: '2'},
          B: {text: '4', correct: true},
          C: {text: '5'}
        }
      },
      '3c481c1d-d52f-4432-8a3c-1b773ea2613c': {
        id: '3c481c1d-d52f-4432-8a3c-1b773ea2613c',
        text: '3 * 3',
        cost: 2,
        answers: {
          A: {text: '0'},
          B: {text: '6'},
          C: {text: '9', correct: true},
          D: {text: '12'}
        }
      },
      'a699dfa5-26bb-40a1-8a80-c55be3840d82': {
        id: 'a699dfa5-26bb-40a1-8a80-c55be3840d82',
        text: '10 / 2',
        cost: 3,
        answers: {
          A: {text: '0'},
          B: {text: '10'},
          C: {text: '2'},
          D: {text: '1'},
          E: {text: '5', correct: true}
        }
      }
    }
  },
  '86e77100-3a25-4e3b-a731-b9ce45e8f522': {
    id: '86e77100-3a25-4e3b-a731-b9ce45e8f522',
    creationDate: new Date('02-03-2021').toISOString(),
    name: 'Second quiz',
    questionsOrder: [
      '7c30068c-c21b-4e93-99e3-facb743f16d3'
    ],
    questions: {
      '7c30068c-c21b-4e93-99e3-facb743f16d3': {
        id: '7c30068c-c21b-4e93-99e3-facb743f16d3',
        text: 'Ukrainian cities',
        partialAnswer: true,
        cost: 10,
        answers: {
          A: {text: 'Donetsk', correct: true},
          B: {text: 'Kyiv', correct: true},
          C: {text: 'Dublin'}
        }
      }
    }
  }
}
