import {createAsyncThunkAction} from '../../common'

export const fetchAnswers = createAsyncThunkAction(
  'FetchAnswers',
  (_, {extra: {services}}) =>
    services.answers.getAnswers()
)
