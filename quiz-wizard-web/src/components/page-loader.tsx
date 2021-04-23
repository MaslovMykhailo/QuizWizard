import {makeStyles} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

export function PageLoader() {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <CircularProgress size="4rem" />
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  box: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
