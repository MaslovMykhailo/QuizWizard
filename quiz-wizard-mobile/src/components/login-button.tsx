import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, ButtonProps, Button} from '@ui-kitten/components'
import {useUserLogin} from '@providers'

export const LoginButton: FC<ButtonProps> = () => {
  const [t] = useTranslation()
  const login = useUserLogin()

  return (
    <Button size="medium" onPress={login}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('LOGIN_BUTTON_TEXT')} />
      )}
    </Button>
  )
}
