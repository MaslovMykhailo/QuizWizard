import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, ButtonProps} from '@ui-kitten/components'
import {useUserLogout} from '@providers'

import {FacebookButton} from './facebook-button'

export const LogoutButton: FC<ButtonProps> = (props) => {
  const [t] = useTranslation()
  const logout = useUserLogout()

  return (
    <FacebookButton size="medium" {...props} onPress={logout}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('LOGOUT_BUTTON_TEXT')} />
      )}
    </FacebookButton>
  )
}
