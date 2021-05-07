import {useTranslation} from 'react-i18next'
import {useSelector, selectGroupsAnalyticByQuizzes, selectSortedQuizzes} from 'quiz-wizard-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export function GroupsAnalytic() {
  const [t] = useTranslation()

  const analytics = useSelector(selectGroupsAnalyticByQuizzes)
  const allQuizzes = useSelector(selectSortedQuizzes)

  const quizzes = allQuizzes.filter(
    (quiz) => analytics.some((analytic) => quiz.id in analytic.quizzesAnalytics)
  )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('GROUP')}</TableCell>
            {quizzes.map((quiz) => (
              <TableCell key={quiz.id}>{quiz.name}</TableCell>
            ))}
            <TableCell align="right">{t('TOTAL_ANSWERS_COUNT')}</TableCell>
            <TableCell align="right">{t('AVERAGE_RESULT')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analytics.map(({group, averageResult, totalAnswersCount, quizzesAnalytics}) => (
            <TableRow key={group.id}>
              <TableCell
                component="th"
                scope="row"
              >
                {group.name}
              </TableCell>
              {quizzes.map((quiz) => (
                <TableCell key={quiz.id}>
                  <Typography variant="body2">
                    {t('ANSWERS_COUNT', {
                      count: quizzesAnalytics[quiz.id] ?
                        quizzesAnalytics[quiz.id].answersCount :
                        '-/-' as unknown as number
                    })}
                  </Typography>
                  <Typography variant="body2">
                    {
                      `${t('AVERAGE_RESULT')} ${quizzesAnalytics[quiz.id] ?
                        Math.round(quizzesAnalytics[quiz.id].averageResult * 100) + '%' :
                        '-/-'}`
                    }
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="right">
                {totalAnswersCount}
              </TableCell>
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
