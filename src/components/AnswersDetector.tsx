import React, {FC, useRef, useCallback} from 'react'
import {StyleSheet, Platform} from 'react-native'
import {RNCamera, RNCameraProps} from 'react-native-camera'
import {IconRegistry, ApplicationProvider, Layout} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping, light} from '@eva-design/eva'

const CameraView: FC = () => {
  const cameraRef = useRef<RNCamera>(null)

  const onBarCodeRead = useCallback<
    NonNullable<RNCameraProps['onBarCodeRead']>
  >(({data, bounds: {origin}}) => {
    if (data === 'quiz-wizard-v1') {
      if (Platform.OS === 'android' && Array.isArray(origin)) {
        console.log(origin, origin.length)
      }
    }
  }, [])

  return (
    <RNCamera
      ref={cameraRef}
      style={styles.camera}
      captureAudio={false}
      onBarCodeRead={onBarCodeRead}
    />
  )
}

export const AnswersDetector: FC = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <Layout style={styles.container}>
          <CameraView />
        </Layout>
      </ApplicationProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  camera: {
    flex: 1
  }
})
