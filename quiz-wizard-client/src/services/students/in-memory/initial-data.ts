import {StudentId, StudentSchema} from 'quiz-wizard-schema'

export const initialData: Record<StudentId, StudentSchema> = {
  '00002': {
    id: '00002',
    firstName: 'John',
    lastName: 'Smith',
    groups: [
      'effff966-68d5-4829-b7eb-fc4709cd8621'
    ]
  },
  '00004': {
    id: '00004',
    firstName: 'Sam',
    lastName: 'Williams',
    groups: [
      'effff966-68d5-4829-b7eb-fc4709cd8621',
      'e169cfce-d410-43b2-bac6-56099ebd9083'
    ]
  },
  '00006': {
    id: '00006',
    firstName: 'Samantha',
    lastName: 'Fox',
    groups: [
      'e169cfce-d410-43b2-bac6-56099ebd9083'
    ]
  },
  '00007': {
    id: '00007',
    firstName: 'Danial',
    lastName: 'Craig',
    groups: [
      'effff966-68d5-4829-b7eb-fc4709cd8621'
    ]
  },
  '00010': {
    id: '00010',
    firstName: 'Rick',
    lastName: 'Sanchez',
    groups: [
      '70202cf6-0245-4f80-880d-e6111d045ac8'
    ]
  },
  '00100': {
    id: '00100',
    firstName: 'Kevin',
    lastName: 'Spacey'
  }
}
