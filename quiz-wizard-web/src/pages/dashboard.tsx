import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import {makeStyles} from '@material-ui/core/styles'

import {ActionCard, ActionCardProps} from '../components'
import {Path} from '../routes'

export function DashboardPage() {
  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h2"
          children="Start using QuizWizard"
        />
      </Grid>
      <Grid
        item
        container
        spacing={4}
        alignItems="baseline"
      >
        <Grid item>
          <CardLink
            link={Path.students()}
            text="Manage students"
            icon={(
              <LocalLibraryIcon
                color="primary"
                fontSize="large"
              />
            )}
          />
        </Grid>
        <Grid item>
          <CardLink
            link={Path.groups()}
            text="Manage groups"
            icon={(
              <GroupIcon
                color="secondary"
                fontSize="large"
              />
            )}
          />
        </Grid>
        <Grid item>
          <CardLink
            link={Path.quizzes()}
            text="Manage quizzes"
            icon={(
              <AssignmentIcon
                color="primary"
                fontSize="large"
              />
            )}
          />
        </Grid>
        <Grid item>
          <CardLink
            link={Path.quizzes()}
            text="Manage answers"
            icon={(
              <AssignmentTurnedInIcon
                color="secondary"
                fontSize="large"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="h2"
          children="Can be useful"
        />
      </Grid>
      <Grid
        item
        container
        spacing={4}
        alignItems="baseline"
      >
        <Grid item>
          <ActionCard
            text="Download answer sheet"
            icon={(
              <AssignmentReturnedIcon
                color="primary"
                fontSize="large"
              />
            )}
          />
        </Grid>
        <Grid item>
          <CardLink
            link={Path.analytics()}
            text="Explore analytics"
            icon={(
              <EqualizerIcon
                color="secondary"
                fontSize="large"
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

interface CardLinkProps extends ActionCardProps {
  link: string
}

function CardLink({
  link,
  ...cardProps
}: CardLinkProps) {
  const classes = useStyles()
  return (
    <Link
      to={link}
      className={classes.link}
    >
      <ActionCard {...cardProps} />
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  link: {
    color: 'unset',
    textDecoration: 'none'
  }
}))
