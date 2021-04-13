import React, {FC, useCallback} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  ListProps,
  ListItem,
  Text,
  StyleService,
  useStyleSheet,
  List,
  useTheme,
  Divider
} from '@ui-kitten/components'
import {PersonIcon, HashIcon, QuestionMarkIcon} from '@icons'
import {Responder, ResponderId} from '@types'

export interface RespondersListProps extends ListProps {
  responders: Responder[]
  onResponderPress(id?: ResponderId): void
}

export const RespondersList: FC<RespondersListProps> = ({
  responders,
  onResponderPress,
  ...props
}) => {
  const [t] = useTranslation()
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  const renderItem = useCallback(
    ({item: {id, name}}: {item: Responder}) => (
      <ListItem
        title={name}
        onPress={() => requestAnimationFrame(() => onResponderPress(id))}
        accessoryLeft={PersonIcon}
        accessoryRight={(viewProps) => (
          <View {...viewProps} style={[viewProps?.style, styles.idWrapper]}>
            <HashIcon
              style={styles.idIcon}
              fill={theme['text-primary-color']}
            />
            <Text children={id} />
          </View>
        )}
      />
    ),
    [onResponderPress, styles.idIcon, styles.idWrapper, theme]
  )

  const renderListFooter = useCallback(
    () => (
      <>
        <Divider />
        <ListItem
          accessoryLeft={QuestionMarkIcon}
          onPress={() => requestAnimationFrame(() => onResponderPress())}
          title={t<string>('ANONYMOUS')}
        />
      </>
    ),
    [onResponderPress, t]
  )

  return (
    <List
      {...props}
      data={responders}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={renderListFooter}
    />
  )
}

const themedStyles = StyleService.create({
  idWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 48
  },
  idIcon: {
    width: 20,
    height: 20
  }
})
