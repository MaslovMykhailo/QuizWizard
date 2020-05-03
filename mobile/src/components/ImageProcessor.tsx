import React, {FC, useCallback, useState} from 'react'
import {StyleSheet, Image} from 'react-native'
import {
  ApplicationProvider,
  Button,
  List,
  ListItem,
  Layout,
  IconRegistry,
  Text,
  Spinner
} from '@ui-kitten/components'
import {mapping, light as theme} from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {OpenCV} from '@native-components'

import {processingDataList, ProcessingData} from './data'

interface ImageListProps {
  onProcess(imageBase64: string): void
}

const ImageList: FC<ImageListProps> = ({onProcess}) => {
  type ItemData = {
    item: ProcessingData
    index: number
  }

  const createOnProcess = useCallback(
    (imageBase64: string) => () => onProcess(imageBase64),
    [onProcess]
  )

  const renderItem = useCallback(
    ({item: {title, imageBase64}}: ItemData) => (
      <ListItem style={styles.listItem}>
        <Image
          style={styles.image}
          source={{
            uri: imageBase64
          }}
        />
        <Text children={title} />
        <Button
          size="small"
          onPress={createOnProcess(imageBase64)}
          children="PROCESS"
        />
      </ListItem>
    ),
    [createOnProcess]
  )

  return (
    <List
      style={styles.list}
      data={processingDataList}
      renderItem={renderItem}
    />
  )
}

interface ImagePreviewProps {
  imageBase64: string
  onClose(): void
}

const ImagePreview: FC<ImagePreviewProps> = ({imageBase64, onClose}) => (
  <>
    <Image
      style={styles.imagePreview}
      source={{
        uri: `data:image/jpeg;base64,${imageBase64}`
      }}
    />
    <Button
      style={styles.closePreviewButton}
      onPress={onClose}
      children="CLOSE"
    />
  </>
)

export const ImageProcessor: FC = () => {
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [isProcessing, setIsProcessing] = useState(false)

  const onProcess = useCallback((imageBase64: string) => {
    setIsProcessing(true)
    OpenCV.processImage(
      imageBase64.replace('data:image/jpeg;base64,', ''),
      (e: any) => {
        console.log('error', e)
        setIsProcessing(false)
      },
      (r?: string, arr?: string) => {
        console.log('success', arr)
        setPreview(r)
        setIsProcessing(false)
      }
    )
  }, [])

  const onClosePreview = useCallback(() => setPreview(undefined), [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Layout style={styles.container}>
          {isProcessing ? (
            <Spinner size="large" />
          ) : preview ? (
            <ImagePreview imageBase64={preview} onClose={onClosePreview} />
          ) : (
            <ImageList onProcess={onProcess} />
          )}
        </Layout>
      </ApplicationProvider>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  },
  imagePreview: {
    width: '75%',
    aspectRatio: 0.5
  },
  closePreviewButton: {
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: 12,
    zIndex: 10
  },
  list: {
    width: '100%'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
