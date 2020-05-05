import React, {FC, useRef, useCallback, useState} from 'react'
import {Image, StyleSheet} from 'react-native'
import {RNCamera, RNCameraProps, TakePictureResponse} from 'react-native-camera'
import {
  IconRegistry,
  ApplicationProvider,
  Layout,
  Text,
  Spinner
} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping, light} from '@eva-design/eva'
import {OpenCV} from '@native-components'

import {CaptureButton} from './CaptureButton'

interface CameraViewProps {
  onTakePicture(picture: TakePictureResponse): void
  onTakePictureStart(): void
}

const CameraView: FC<CameraViewProps> = ({
  onTakePicture,
  onTakePictureStart
}) => {
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
      onTakePictureStart()
      camera
        .takePictureAsync({
          base64: true,
          fixOrientation: true,
          orientation: 'portrait'
        })
        .then(onTakePicture)
        .catch(console.log)
    }
  }, [onTakePicture, onTakePictureStart])

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

interface Result {
  answers: string[][]
  responderId: number[][]
  sheetBase64: string
}

interface ResultViewProps {
  result: Result
}

const ResultView: React.FC<ResultViewProps> = ({result}) => {
  return (
    <Layout style={styles.result}>
      <Text category="h2" status="primary">
        Decoded image
      </Text>
      <Image
        style={styles.imagePreview}
        source={{
          uri: `data:image/jpeg;base64,${result.sheetBase64}`
        }}
      />
      <Text category="h3" status="primary">
        Responder ID
      </Text>
      <Text>{result.responderId.map((sub) => sub.join('')).join(' ')}</Text>
      <Text category="h3" status="primary">
        Answers
      </Text>
      <Layout style={styles.answers}>
        {result.answers.map((item, index) => (
          <Text style={styles.item} key={index}>
            {index + 1 + ': ' + item.join(', ')}
          </Text>
        ))}
      </Layout>
    </Layout>
  )
}

export const AnswersDetector: FC = () => {
  const [result, setResult] = useState<Result | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const onTakePicture = useCallback((picture: TakePictureResponse) => {
    setLoading(true)
    OpenCV.decodeImage(
      picture.base64,
      (error: any) => {
        console.log({error})
        setLoading(false)
      },
      (res: any) => {
        setResult(JSON.parse(res))
        setLoading(false)
      }
    )
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <Layout style={styles.container}>
          {result ? (
            <ResultView result={result} />
          ) : (
            <CameraView
              onTakePictureStart={() => setLoading(true)}
              onTakePicture={onTakePicture}
            />
          )}
          {loading && (
            <Layout style={styles.spinner}>
              <Spinner size="large" />
            </Layout>
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
    flexDirection: 'column'
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
    width: '65%',
    aspectRatio: 0.7
  },
  result: {
    flex: 1,
    width: '100%'
  },
  answers: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  item: {
    width: '20%'
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  }
})
