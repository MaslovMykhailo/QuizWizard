import React, {useRef, useCallback, useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {RNCamera as Camera, TakePictureResponse} from 'react-native-camera'
import {OpenCV} from '@native-components'

interface PicturePreviewProps {
  picture?: TakePictureResponse
  preview: string | null
  onRepeat(): void
}

const PicturePreview: React.FC<PicturePreviewProps> = ({onRepeat, preview}) => {
  return (
    <View style={styles.container}>
      {preview && (
        <Image
          style={styles.imagePreview}
          source={{
            uri: `data:image/png;base64,${preview}`
          }}
        />
      )}
      <View style={styles.repeatPhotoContainer}>
        <TouchableOpacity onPress={onRepeat}>
          <Text style={styles.photoPreviewRepeatPhotoText}>Repeat photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface CameraViewProps {
  onTakePicture(photo: TakePictureResponse): void
}

const CameraView: React.FC<CameraViewProps> = ({onTakePicture}) => {
  const cameraRef = useRef<Camera>(null)

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
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.preview} captureAudio={false}>
        <View style={styles.takePictureContainer}>
          <TouchableOpacity onPress={onSnap}>
            <Text style={styles.snapButton}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

export const CircleRecognitionCamera = () => {
  const [picture, setPicture] = useState<TakePictureResponse | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onTakePicture = useCallback((data: TakePictureResponse) => {
    setPicture(data)
    OpenCV.detectCircles(
      data.base64,
      (e: any) => console.log('error', e),
      (r?: string, arr?: string) => {
        console.log('success', arr)
        if (r) {
          setPreview(r)
        }
      }
    )
  }, [])
  const onRepeatPicture = useCallback(() => setPicture(null), [])

  return picture ? (
    <PicturePreview
      picture={picture}
      preview={preview}
      onRepeat={onRepeatPicture}
    />
  ) : (
    <CameraView onTakePicture={onTakePicture} />
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  repeatPhotoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoPreviewRepeatPhotoText: {
    color: '#abcfff',
    fontSize: 15
  },
  preview: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  takePictureContainer: {
    position: 'absolute',
    paddingVertical: 20,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  snapButton: {
    fontSize: 14,
    backgroundColor: '#fff'
  }
})
