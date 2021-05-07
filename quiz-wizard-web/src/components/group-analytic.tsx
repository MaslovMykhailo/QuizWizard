import {useTranslation} from 'react-i18next'
import {useSelector, selectGroupAnalyticsGetter, selectSortedQuizzes} from 'quiz-wizard-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import {useQuery} from '../hooks'

export function GroupAnalytic() {
  const [t] = useTranslation()

  const groupId = useQuery().get('id')!

  const analytics = useSelector(selectGroupAnalyticsGetter)(groupId)
  const allQuizzes = useSelector(selectSortedQuizzes)

  const quizzes = allQuizzes.filter(
    (quiz) => analytics.some((analytic) => quiz.id in analytic.studentResults)
  )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('STUDENT')}</TableCell>
            <TableCell>{t('STUDENT_ID')}</TableCell>
            {quizzes.map((quiz) => (
              <TableCell key={quiz.id}>{quiz.name}</TableCell>
            ))}
            <TableCell align="right">{t('AVERAGE_RESULT')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analytics.map(({student, studentResults, averageResult}) => (
            <TableRow key={student.id}>
              <TableCell
                component="th"
                scope="row"
              >
                {`${student.lastName} ${student.firstName}` }
              </TableCell>
              <TableCell>
                {student.id}
              </TableCell>
              {quizzes.map((quiz) => (
                <TableCell key={quiz.id}>
                  {
                    studentResults[quiz.id] !== undefined ?
                      Math.round(studentResults[quiz.id]! * 100) + '%' :
                      '-/-'
                  }
                </TableCell>
              ))}
              <TableCell align="right">
                {averageResult ? `${Math.round(averageResult * 100)}%` : '-/-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
