import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, ButtonProps, Button} from '@ui-kitten/components'
import {useUserLogout} from '@providers'

export const LogoutButton: FC<ButtonProps> = (props) => {
  const [t] = useTranslation()
  const logout = useUserLogout()

  return (
    <Button size="medium" {...props} onPress={logout}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('LOGOUT_BUTTON_TEXT')} />
      )}
    </Button>
  )
}
