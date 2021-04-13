import React, {FC, useState, useCallback} from 'react'
import {ViewProps, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Input, Button} from '@ui-kitten/components'
import {PersonAddIcon} from '@icons'

export interface ResponderInputProps extends ViewProps {
  onAddResponder(name: string): void
}

export const ResponderInput: FC<ResponderInputProps> = ({
  style,
  onAddResponder,
  ...props
}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const [value, setValue] = useState('')
  const onAdd = useCallback(() => {
    requestAnimationFrame(() => {
      onAddResponder(value)
      setValue('')
    })
  }, [onAddResponder, value])

  return (
    <View {...props} style={[styles.root, style]}>
      <Input
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={t<string>('RESPONDER_PLACEHOLDER')}
        autoCapitalize="sentences"
      />
      <Button
        disabled={!value.length}
        accessoryLeft={PersonAddIcon}
        onPress={onAdd}
        children={t<string>('ADD')}
      />
    </View>
  )
}

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  input: {
    flex: 1,
    marginTop: 4,
    marginRight: 12
  }
})
