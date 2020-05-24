import React, {FC} from 'react'
import {StyleSheet} from 'react-native'
import {Route} from '@react-navigation/native'
import {StackHeaderProps} from '@react-navigation/stack'
import {
  TopNavigation,
  TopNavigationAction,
  Spinner
} from '@ui-kitten/components'
import {ArrowBackIcon} from '@icons'

export interface NavigationHeaderProps
  extends Pick<StackHeaderProps, 'scene' | 'navigation'> {
  getTitle: (route: Route<string>) => string
  getSubtitle?: (route: Route<string>) => string | undefined
  canGoBack: (route: Route<string>) => boolean
  showLoadingIndicator?: boolean
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  getTitle,
  getSubtitle,
  canGoBack,
  showLoadingIndicator,
  ...props
}) => {
  const {
    navigation: {goBack},
    scene: {route}
  } = props

  return (
    <TopNavigation
      {...props}
      style={styles.root}
      alignment="center"
      title={getTitle(route)}
      subtitle={getSubtitle?.(route)}
      accessoryLeft={
        canGoBack(route)
          ? () => <TopNavigationAction onPress={goBack} icon={ArrowBackIcon} />
          : undefined
      }
      accessoryRight={
        showLoadingIndicator ? () => <Spinner size="small" /> : undefined
      }
    />
  )
}

const styles = StyleSheet.create({
  root: {
    height: 60,
    paddingHorizontal: 12
  }
})
