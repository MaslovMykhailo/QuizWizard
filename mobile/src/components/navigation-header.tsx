import React, {FC} from 'react'
import {StyleSheet} from 'react-native'
import {Route} from '@react-navigation/native'
import {StackHeaderProps} from '@react-navigation/stack'
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components'
import {ArrowBackIcon} from '@icons'

export interface NavigationHeaderProps extends StackHeaderProps {
  getTitle: (route: Route<string>) => string
  getSubtitle: (route: Route<string>) => string | undefined
  canGoBack: (route: Route<string>) => boolean
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  getTitle,
  getSubtitle,
  canGoBack,
  ...props
}) => {
  const {
    navigation,
    scene: {route}
  } = props

  return (
    <TopNavigation
      {...props}
      style={styles.root}
      alignment="center"
      title={getTitle(route)}
      subtitle={getSubtitle(route)}
      accessoryLeft={
        canGoBack(route)
          ? () => (
              <TopNavigationAction
                onPress={navigation.goBack}
                icon={ArrowBackIcon}
              />
            )
          : undefined
      }
    />
  )
}

const styles = StyleSheet.create({
  root: {
    height: 60
  }
})
