import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import {makeStyles} from '@material-ui/core/styles'

export function InitialLoader() {
  const classes = useStyles()
  const title = 'Quiz Wizard'

  return (
    <Grid
      container
      direction="column"
      className={classes.container}
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.item}
      >
        <Typography
          variant="h1"
          color="primary"
          children={title}
        />
      </Grid>
      <LinearProgress
        color="secondary"
        className={classes.divider}
      />
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.item}
      >
        <CircularProgress size="4rem" />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    background: theme.palette.background.default
  },
  item: {
    flexGrow: 1
  },
  divider: {
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(12)
  }
}))
