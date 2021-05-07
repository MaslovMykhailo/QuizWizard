import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {useTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {
  selectUser,
  selectIsUserDataFetching,
  selectIsUserDataUpdating,
  useDispatch,
  fetchUserData,
  signOut,
  selectIsUserSigningOut,
  updateUserData
} from 'quiz-wizard-redux'

import {LanguageSelect, PageLoader, UserAvatar} from '../components'
import {useInputState} from '../hooks'
import {Path} from '../routes'

export function AccountPage() {
  const [t] = useTranslation()
  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchUserData())
    },
    [dispatch]
  )

  const user = useSelector(selectUser)

  const [userFirstName, onChangeUserFirstName] = useInputState(user?.firstName)
  const [userLastName, onChangeUserLastName] = useInputState(user?.lastName)

  const isSigningOut = useSelector(selectIsUserSigningOut)
  const isUserDataFetching = useSelector(selectIsUserDataFetching)
  const isUserDataUpdating = useSelector(selectIsUserDataUpdating)

  const waitForUpdateRef = useRef(false)

  if (
    isSigningOut ||
    isUserDataFetching ||
    isUserDataUpdating ||
    waitForUpdateRef.current ||
    !user
  ) {
    return (
      <PageLoader />
    )
  }

  const onSignOut = () => {
    dispatch(signOut())
      .then(() => history.replace(Path.dashboard()))
  }

  const onCancel = () => {
    history.goBack()
  }

  const onSave = () => {
    if (userFirstName && userLastName) {
      waitForUpdateRef.current = true
      dispatch(
        updateUserData({
          ...user,
          firstName: userFirstName,
          lastName: userLastName
        })
      )
        .then(() => history.goBack())
        .catch(() => waitForUpdateRef.current = false)
    }
  }

  const hasChanges =
    user.firstName !== userFirstName ||
    user.lastName !== userLastName

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      className={classes.container}
      component="form"
    >
      <Grid
        xs={4}
        item
        container
        justify="center"
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          spacing={4}
        >
          <Grid
            item
            container
            justify="center"
          >
            <UserAvatar {...user} />
          </Grid>
          <Grid
            item
            container
            justify="center"
          >
            <TextField
              aria-readonly="true"
              variant="filled"
              label={t('EMAIL')}
              value={user.email}
              className={classes.email}
              InputProps={{readOnly: true}}
            />
          </Grid>
          <Grid
            item
            container
            justify="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={onSignOut}
              children={t('SIGN_OUT')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={8}
        spacing={4}
        direction="column"
      >
        <Grid
          item
          container
          justify="center"
        >
          <Typography
            variant="h3"
            children={t('USER_INFO')}
          />
        </Grid>
        <Grid
          item
          container
          justify="center"
        >
          <TextField
            variant="outlined"
            label={t('FIRST_NAME')}
            autoComplete="fname"
            value={userFirstName}
            error={!userFirstName}
            onChange={onChangeUserFirstName}
            className={classes.input}
          />
        </Grid>
        <Grid
          item
          container
          justify="center"
        >
          <TextField
            variant="outlined"
            label={t('LAST_NAME')}
            autoComplete="lname"
            value={userLastName}
            error={!userLastName}
            onChange={onChangeUserLastName}
            className={classes.input}
          />
        </Grid>
        <Grid
          item
          container
          justify="center"
        >
          <LanguageSelect
            variant="outlined"
            className={classes.input}
          />
        </Grid>
        <Grid
          item
          container
          justify="space-around"
        >
          <Button
            variant="contained"
            children={t('CANCEL')}
            onClick={onCancel}
          />
          <Button
            variant="contained"
            color="primary"
            children={t('SAVE')}
            onClick={onSave}
            disabled={!hasChanges}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4)
  },
  input: {
    width: '75%'
  },
  email: {
    width: '100%'
  }
}))
