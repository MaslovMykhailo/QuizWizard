import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, ButtonProps} from '@ui-kitten/components'
import {useUserLogin} from '@providers'

import {FacebookButton} from './facebook-button'

export const LoginButton: FC<ButtonProps> = () => {
  const [t] = useTranslation()
  const login = useUserLogin()

  return (
    <FacebookButton size="medium" onPress={login}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('LOGIN_BUTTON_TEXT')} />
      )}
    </FacebookButton>
  )
}
