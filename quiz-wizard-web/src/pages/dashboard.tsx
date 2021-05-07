import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
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
import {useDownloadAnswerSheet} from '../hooks'
import {Path} from '../routes'

export function DashboardPage() {
  const [t] = useTranslation()
  const onDownloadAnswerSheet = useDownloadAnswerSheet()

  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h2"
          children={t('START_USING_CAPTION')}
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
            text={t('MANAGE_STUDENTS')}
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
            text={t('MANAGE_GROUPS')}
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
            text={t('MANAGE_QUIZZES')}
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
            text={t('MANAGE_ANSWERS')}
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
          children={t('CAN_BE_USEFUL_CAPTION')}
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
            text={t('DOWNLOAD_ANSWER_SHEET')}
            onClick={onDownloadAnswerSheet}
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
            text={t('EXPLORE_ANALYTICS')}
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
