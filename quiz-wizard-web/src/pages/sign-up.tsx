import {useState} from 'react'
import {fetchPreferences, setUser, useDispatch} from 'quiz-wizard-redux'
import {UserSchema} from 'quiz-wizard-schema'

import {InitialLoader, Page, SignUpForm} from '../components'
import {useAuthService} from '../providers'
import {Path} from '../routes'

export function SignUpPage() {
  const auth = useAuthService()
  const dispatch = useDispatch()

  const [isSigningUp, setIsSigningUp] = useState(false)
  const [signUpError, setSignUpError] = useState<Error | undefined>()

  const onSignUp = (email: string, password: string, user: UserSchema) => {
    setIsSigningUp(true)
    auth.signUp(email, password, user)
      .then(
        ({user}) => dispatch(fetchPreferences())
          .then(() => requestAnimationFrame(() => dispatch(setUser(user))))
      )
      .catch(setSignUpError)
      .finally(() => setIsSigningUp(false))
  }

  if (isSigningUp) {
    return (
      <InitialLoader />
    )
  }

  return (
    <Page maxWidth="xs">
      <SignUpForm
        signInLink={Path.signIn()}
        onSignUp={onSignUp}
        signUpError={signUpError}
      />
    </Page>
  )
}
