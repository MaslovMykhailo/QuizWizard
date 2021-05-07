import {createThunkAction} from '../../common'
import {fetchAnswers} from '../answers'
import {fetchGroups} from '../groups'
import {fetchQuizzes} from '../quizzes'
import {fetchStudents} from '../students'

export const fetchAllResources = createThunkAction(
  () => (dispatch) => {
    dispatch(fetchStudents())
    dispatch(fetchGroups())
    dispatch(fetchQuizzes())
    dispatch(fetchAnswers())
  }
)

