import {FormEvent} from 'react'
import {UserSchema} from 'quiz-wizard-schema'
import {useTranslation} from 'quiz-wizard-localization'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

import {Link} from './link'

export interface SignUpProps {
  signInLink: string
  onSignUp: (email: string, password: string, user: UserSchema) => void
  signUpError?: Error
}

export function SignUpForm({
  signInLink,
  onSignUp,
  signUpError
}: SignUpProps) {
  const classes = useStyles()
  const [t] = useTranslation()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    onSignUp(email, password, {email, firstName, lastName})
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
        {t('SIGN_UP_CAPTION')}
      </Typography>
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label={t('FIRST_NAME')}
              error={Boolean(signUpError)}
              autoFocus
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label={t('LAST_NAME')}
              name="lastName"
              autoComplete="lname"
              error={Boolean(signUpError)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label={t('EMAIL')}
              name="email"
              autoComplete="email"
              error={Boolean(signUpError)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label={t('PASSWORD')}
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(signUpError)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t('SIGN_UP_SUBMIT_BUTTON')}
        </Button>
        <Grid
          container
          justify="flex-end"
        >
          <Grid item>
            <Link
              to={signInLink}
              variant="body2"
            >
              {t('SIGN_UP_FORM_SIGN_IN_HINT')}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
