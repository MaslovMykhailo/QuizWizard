import React, {FC} from 'react'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components'
import {OptionsIcon, HomeIcon, FileIcon, CheckmarkSquareIcon} from '@icons'

export const NavigationBar: FC<BottomTabBarProps> = ({
  navigation: {navigate},
  state: {index, routeNames}
}) => (
  <BottomNavigation
    selectedIndex={index}
    onSelect={(indexToNavigate) => navigate(routeNames[indexToNavigate])}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={FileIcon} />
    <BottomNavigationTab icon={CheckmarkSquareIcon} />
    <BottomNavigationTab icon={OptionsIcon} />
  </BottomNavigation>
)
