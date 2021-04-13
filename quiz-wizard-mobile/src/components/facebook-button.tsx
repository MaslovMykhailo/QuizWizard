import React, {FC} from 'react'
import {Button, ButtonProps} from '@ui-kitten/components'
import {FacebookIcon} from '@icons'

export const FacebookButton: FC<Omit<ButtonProps, 'accessoryLeft'>> = (
  props
) => <Button {...props} accessoryLeft={FacebookIcon} />
