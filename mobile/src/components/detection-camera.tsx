import React, {FC, useRef, useCallback, useState} from 'react'
import {View} from 'react-native'
import {RNCamera, RNCameraProps, TakePictureResponse} from 'react-native-camera'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Button, Text} from '@ui-kitten/components'
import {ignore} from '@utils'
import {EyeIcon, EyeOffIcon, FlashIcon, FlashOffIcon} from '@icons'

import {CaptureButton} from './capture-button'

interface CameraViewProps {
  onTakePicture(picture: TakePictureResponse): void
  onTakePictureStart(): void
}

export const DetectionCamera: FC<CameraViewProps> = ({
  onTakePicture,
  onTakePictureStart
}) => {
  const styles = useStyleSheet(themedStyles)

  const [tipsMode, toggleTipsMode] = useToggle('on')
  const [flashMode, toggleFlashMode] = useToggle('off')

  const cameraRef = useRef<RNCamera>(null)

  const [barCodeDetected, setBarCodeDetected] = useState(false)
  const onBarCodeRead = useCallback<
    NonNullable<RNCameraProps['onBarCodeRead']>
  >(({data}) => {
    if (data === 'quiz-wizard-v1') {
      setBarCodeDetected(true)
    }
  }, [])

  const onCapture = useCallback(() => {
    const camera = cameraRef.current
    if (camera) {
      onTakePictureStart()
      camera
        .takePictureAsync({
          base64: true,
          fixOrientation: true,
          orientation: 'portrait'
        })
        .then(onTakePicture)
        .catch(ignore)
        .finally(() => setBarCodeDetected(false))
    }
  }, [onTakePicture, onTakePictureStart])

  return (
    <RNCamera
      ref={cameraRef}
      flashMode={
        flashMode === 'on'
          ? RNCamera.Constants.FlashMode.on
          : RNCamera.Constants.FlashMode.off
      }
      style={styles.camera}
      captureAudio={false}
      onBarCodeRead={!barCodeDetected ? onBarCodeRead : undefined}>
      <View style={styles.controls}>
        <Button
          appearance="ghost"
          accessoryLeft={tipsMode === 'on' ? EyeIcon : EyeOffIcon}
          onPress={toggleTipsMode}
        />
        <CaptureButton disabled={!barCodeDetected} onPress={onCapture} />
        <Button
          appearance="ghost"
          accessoryLeft={flashMode === 'on' ? FlashIcon : FlashOffIcon}
          onPress={toggleFlashMode}
        />
      </View>
      {tipsMode === 'on' && <Tips />}
    </RNCamera>
  )
}

const Tips: FC = () => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <View style={styles.tips}>
      <View style={styles.tipsQr}>
        <Text category="h4" appearance="hint" children={t<string>('QR')} />
      </View>
      <Text
        style={styles.tipText}
        appearance="hint"
        children={t<string>('QR_EXPLANATION')}
      />
    </View>
  )
}

const themedStyles = StyleService.create({
  camera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    height: 84,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'color-basic-1100'
  },
  tips: {
    top: '12%',
    borderWidth: 1,
    borderColor: 'text-hint-color',
    width: '84%',
    marginHorizontal: 'auto',
    aspectRatio: 0.7,
    padding: '3%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderStyle: 'dashed',
    borderRadius: 3
  },
  tipsQr: {
    width: '42%',
    aspectRatio: 1,
    padding: '3%',
    borderWidth: 1,
    borderColor: 'text-hint-color',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 3,
    marginRight: '8%'
  },
  tipText: {
    marginTop: '10%',
    width: '48%'
  }
})

const useToggle = (defaultValue: 'on' | 'off') => {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback(
    () =>
      requestAnimationFrame(() => setValue((v) => (v === 'on' ? 'off' : 'on'))),
    []
  )

  return [value, toggle] as const
}
