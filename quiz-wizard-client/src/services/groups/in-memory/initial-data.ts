import {GroupId, GroupSchema} from 'quiz-wizard-schema'

export const initialData: Record<GroupId, GroupSchema> = {
  '26da0c77-1b33-4608-ae08-67d7eefad111': {
    'name': '11 А',
    'description': 'Група учнів 11-А класу',
    'id': '26da0c77-1b33-4608-ae08-67d7eefad111',
    'students': ['00000', '00008', '00005', '00001', '00003', '00007', '00004', '00006']
  },
  '7027c332-1ccb-46da-a04a-1307046214c9': {
    'name': '11 Б',
    'description': 'Група учнів 11-Б класу',
    'id': '7027c332-1ccb-46da-a04a-1307046214c9',
    'students': ['00010', '00002', '00009']
  }
}
