import React, {FC, useMemo} from 'react'
import {observer} from 'mobx-react-lite'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageStyle
} from 'react-native'
import {useAnswerStore} from '@providers'
import {StyleService, useStyleSheet} from '@ui-kitten/components'

export const SheetPreview: FC<TouchableOpacityProps> = observer((props) => {
  const styles = useStyleSheet(themedStyles)

  const answerStore = useAnswerStore()
  const imageSource = useMemo(
    () => ({uri: `data:image/jpeg;base64,${answerStore.sheetBase64}`}),
    [answerStore.sheetBase64]
  )

  return (
    <TouchableOpacity {...props}>
      <Image style={styles.image as ImageStyle} source={imageSource} />
    </TouchableOpacity>
  )
})

const themedStyles = StyleService.create({
  image: {
    height: 56,
    aspectRatio: 0.7,
    borderWidth: 1,
    borderRadius: 3,
    resizeMode: 'contain'
  }
})
