import {makeStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import {SectionTitle} from './section-title'
import {AccountButton} from './account-button'
import {ThemeToggle} from './theme-toggle'

export function Toolbar() {
  const classes = useStyles()

  return (
    <Grid
      container
      alignItems="center"
    >
      <Grid
        item
        className={classes.title}
      >
        <SectionTitle />
      </Grid>
      <Grid item>
        <ThemeToggle />
      </Grid>
      <Grid item>
        <AccountButton />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    marginRight: 'auto'
  }
}))
