import {GroupId, GroupSchema} from 'quiz-wizard-schema'

export const initialData: Record<GroupId, GroupSchema> = {
  'effff966-68d5-4829-b7eb-fc4709cd8621': {
    id: 'effff966-68d5-4829-b7eb-fc4709cd8621',
    name: 'Good group',
    description: 'Very good group',
    students: [
      '00002',
      '00004',
      '00007'
    ]
  },
  'e169cfce-d410-43b2-bac6-56099ebd9083': {
    id: 'e169cfce-d410-43b2-bac6-56099ebd9083',
    name: 'Usual group',
    description: 'Just a usual group',
    students: [
      '00006',
      '00004'
    ]
  },
  '2328572a-eac5-41d4-a759-b486aa2d498b': {
    id: '2328572a-eac5-41d4-a759-b486aa2d498b',
    name: 'Bad group',
    description: 'Very bad group'
  }
}
