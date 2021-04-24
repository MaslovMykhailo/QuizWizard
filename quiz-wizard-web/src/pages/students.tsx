import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  fetchGroups,
  fetchStudents,
  useDispatch,
  selectIsStudentsFetching,
  selectIsGroupsFetching
} from 'quiz-wizard-redux'
import {makeStyles} from '@material-ui/core'

import {AddStudentButton, PageLoader} from '../components'

export function StudentsPage() {
  useStyles()
  const dispatch = useDispatch()

  const isMountedRef = useRef(false)

  useEffect(
    () => {
      dispatch(fetchStudents())
      dispatch(fetchGroups())

      isMountedRef.current = true
    },
    [dispatch]
  )

  const isStudentsFetching = useSelector(selectIsStudentsFetching)
  const isGroupsFetching = useSelector(selectIsGroupsFetching)

  if (
    !isMountedRef.current ||
    isStudentsFetching ||
    isGroupsFetching
  ) {
    return (
      <PageLoader />
    )
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h3"
          children="Students list"
        />
      </Grid>
      <Grid item>
        <AddStudentButton />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({

}))
