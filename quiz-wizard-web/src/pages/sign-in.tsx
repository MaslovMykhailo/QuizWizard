import {useState} from 'react'
import {fetchPreferences, setUser, useDispatch} from 'quiz-wizard-redux'

import {InitialLoader, Page, SignInForm} from '../components'
import {useAuthService} from '../providers'
import {Path} from '../routes'

export function SignInPage() {
  const auth = useAuthService()
  const dispatch = useDispatch()

  const [isSigningIn, setIsSigningIn] = useState(false)
  const [signInError, setSignInError] = useState<Error | undefined>()

  const onSignIn = (email: string, password: string) => {
    setIsSigningIn(true)
    auth.signIn(email, password)
      .then(
        ({user}) => dispatch(fetchPreferences())
          .then(() => requestAnimationFrame(() => dispatch(setUser(user))))
      )
      .catch(setSignInError)
      .finally(() => setIsSigningIn(false))
  }

  if (isSigningIn) {
    return (
      <InitialLoader />
    )
  }

  return (
    <Page maxWidth="xs">
      <SignInForm
        signUpLink={Path.signUp()}
        onSignIn={onSignIn}
        signInError={signInError}
      />
    </Page>
  )
}
