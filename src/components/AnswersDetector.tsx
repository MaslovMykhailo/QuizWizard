import React, {FC, useRef, useCallback, useState} from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {RNCamera, RNCameraProps, TakePictureResponse} from 'react-native-camera'
import {IconRegistry, ApplicationProvider, Layout} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping, light} from '@eva-design/eva'
import {OpenCV} from '@native-components'

import {CaptureButton} from './CaptureButton'

interface CameraViewProps {
  onTakePicture(picture: TakePictureResponse): void
}

const CameraView: FC<CameraViewProps> = ({onTakePicture}) => {
  const cameraRef = useRef<RNCamera>(null)

  const [barCodeDetected, setBarCodeDetected] = useState(false)

  const onBarCodeRead = useCallback<
    NonNullable<RNCameraProps['onBarCodeRead']>
  >(({data}) => {
    if (data === 'quiz-wizard-v1') {
      setBarCodeDetected(true)
    }
  }, [])

  const onSnap = useCallback(() => {
    const camera = cameraRef.current
    if (camera) {
      camera
        .takePictureAsync({
          base64: true,
          fixOrientation: true,
          orientation: 'portrait'
        })
        .then(onTakePicture)
        .catch(console.log)
    }
  }, [onTakePicture])

  return (
    <RNCamera
      ref={cameraRef}
      style={styles.camera}
      captureAudio={false}
      onBarCodeRead={!barCodeDetected ? onBarCodeRead : undefined}>
      {barCodeDetected && (
        <CaptureButton style={styles.button} onPress={onSnap} />
      )}
    </RNCamera>
  )
}

export const AnswersDetector: FC = () => {
  const [answersImage, setAnswersImage] = useState<string | undefined>(
    undefined
  )

  const [aspectRatio, setAspectRation] = useState(1)

  const onTakePicture = (picture: TakePictureResponse) => {
    OpenCV.decodeImage(
      picture.base64,
      (error: any) => console.log({error}),
      (result: any, ratio: any) => {
        setAnswersImage(result)
        setAspectRation(ratio)
      }
    )
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <Layout style={styles.container}>
          {answersImage ? (
            <TouchableOpacity onPress={() => setAnswersImage(undefined)}>
              <Image
                style={{...styles.imagePreview, aspectRatio}}
                source={{
                  uri: `data:image/jpeg;base64,${answersImage}`
                }}
              />
            </TouchableOpacity>
          ) : (
            <CameraView onTakePicture={onTakePicture} />
          )}
        </Layout>
      </ApplicationProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  camera: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  view: {
    borderColor: 'red',
    borderWidth: 2
  },
  button: {
    bottom: 12,
    position: 'absolute',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  imagePreview: {
    width: '75%'
  }
})
