import {AnswerId, AnswerSchema} from 'quiz-wizard-schema'

export const initialData: Record<AnswerId, AnswerSchema> = {
  'b6bf0cce-5946-4167-982e-a5f6ff2720ab': {
    id: 'b6bf0cce-5946-4167-982e-a5f6ff2720ab',
    quiz: '32742e94-1f1e-4301-8482-8835ce7e3696',
    student: '00007',
    creationDate: new Date('05-05-2015'),
    sheet: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Google_Sheets_2020_Logo.svg/1200px-Google_Sheets_2020_Logo.svg.png',
    result: 0.75,
    checks: {
      '070fab1c-e660-457a-8d26-77fb2284555a': {B: true},
      '3c481c1d-d52f-4432-8a3c-1b773ea2613c': {C: true, D: true},
      'a699dfa5-26bb-40a1-8a80-c55be3840d82': {A: true}
    }
  }
}
