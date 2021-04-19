import {FormEvent} from 'react'
import {useTranslation} from 'quiz-wizard-localization'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {makeStyles} from '@material-ui/core/styles'

import {Link} from './link'

export interface SignInProps {
  signUpLink: string
  isSigningIn: boolean
  onSignIn: (email: string, password: string) => void
  signInError?: Error
}

export function SignInForm({
  signUpLink,
  isSigningIn,
  onSignIn,
  signInError
}: SignInProps) {
  const classes = useStyles()
  const [t] = useTranslation()

  if (isSigningIn) {
    return (
      <div className={classes.paper}>
        <CircularProgress />
      </div>
    )
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement)
    onSignIn(formData.get('email') as string, formData.get('password') as string)
    e.preventDefault()
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
      >
        {t('SIGN_IN_CAPTION')}
      </Typography>
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          error={Boolean(signInError)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          error={Boolean(signInError)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className={classes.submit}
        >
          {t('SIGN_IN_SUBMIT_BUTTON')}
        </Button>
        <Grid
          container
          justify="flex-end"
        >
          <Grid item>
            <Link
              to={signUpLink}
              variant="body2"
            >
              {t('SIGN_IN_FORM_SIGN_UP_HINT')}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
