import {UserSchema} from 'quiz-wizard-schema'

export const initialData: Record<string, UserSchema> = {
  'demo.user@mail.com': {
    email: 'demo.user@mail.com',
    firstName: 'Demo',
    lastName: 'User',
    avatar: 'https://www.labgene.ch/1539-large_default/demonstration-devices.jpg'
  }
}
