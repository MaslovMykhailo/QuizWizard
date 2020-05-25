import React, {useCallback, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {TakePictureResponse} from 'react-native-camera'
import {useNavigation, useIsFocused} from '@react-navigation/native'
import {StyleService, useStyleSheet, Text, Button} from '@ui-kitten/components'
import {Decoder} from '@native-components'
import {Screen, DetectionCamera, Loader} from '@components'
import {DetectionRoutes} from '@constants'
import {useAnswerStore} from '@providers'
import {RefreshIcon} from '@icons'
import {View} from 'react-native'

export const DetectionScreen = observer(() => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const answerStore = useAnswerStore()

  const isFocused = useIsFocused()
  const {navigate} = useNavigation()

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onTakePictureStart = useCallback(() => setIsLoading(true), [])
  const onTakePicture = useCallback(
    (picture: TakePictureResponse) => {
      Decoder.decode(picture.base64!)
        .then(answerStore.processDecodedAnswers)
        .then(() => navigate(DetectionRoutes.NewAnswer))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false))
    },
    [answerStore.processDecodedAnswers, navigate]
  )

  const onRetry = useCallback(() => setIsError(false), [])

  return (
    <Screen style={styles.screen}>
      {isFocused && !isError && (
        <DetectionCamera
          onTakePicture={onTakePicture}
          onTakePictureStart={onTakePictureStart}
        />
      )}
      {isLoading && (
        <Loader style={styles.overlay}>
          <Text children={t<string>('PROCESSING')} />
        </Loader>
      )}
      {isError && (
        <View style={[styles.overlay, styles.error]}>
          <Text category="h6" children={t<string>('DETECTION_ERROR')} />
          <Button
            style={styles.tryAgainButton}
            accessoryLeft={RefreshIcon}
            onPress={onRetry}
            children={t<string>('TRY_AGAIN')}
          />
        </View>
      )}
    </Screen>
  )
})

const themedStyles = StyleService.create({
  screen: {
    padding: 0
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'background-basic-color-1'
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tryAgainButton: {
    marginTop: 12
  }
})
