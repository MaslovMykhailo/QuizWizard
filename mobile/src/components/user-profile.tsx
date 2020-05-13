import React, {FC} from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {
  Card,
  CardProps,
  StyleService,
  Text,
  Avatar,
  useStyleSheet,
  useTheme
} from '@ui-kitten/components'
import {useUserProfile} from '@providers'
import {PersonIcon} from '@icons'

export const UserProfile: FC<CardProps> = observer((props) => {
  const [t] = useTranslation()
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)
  const {name, photoUrl} = useUserProfile()

  return (
    <Card
      {...props}
      disabled
      status="primary"
      header={(headerProps) => (
        <View {...headerProps}>
          <Text category="h1" children={t<string>('USER_PROFILE_TITLE')} />
        </View>
      )}>
      <View style={styles.root}>
        {photoUrl.loading || !photoUrl.data ? (
          <PersonIcon
            fill={theme['text-primary-color']}
            style={styles.avatarSkeleton}
          />
        ) : (
          <Avatar size="giant" source={{uri: photoUrl.data}} />
        )}
        <View style={styles.nameWrapper}>
          {name.loading || !name.data ? (
            <Text style={styles.nameSkeleton} />
          ) : (
            <Text category="h5" children={name.data} />
          )}
        </View>
      </View>
    </Card>
  )
})

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameWrapper: {
    marginLeft: 24,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatarSkeleton: {
    width: 54,
    height: 54,
    backgroundColor: 'background-basic-color-2',
    borderRadius: 54,
    borderWidth: 1,
    borderColor: 'border-basic-color-5'
  },
  nameSkeleton: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: 'background-basic-color-2'
  }
})
