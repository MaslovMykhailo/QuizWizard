import React, {FC, useMemo} from 'react'
import {observer} from 'mobx-react-lite'
import {Image, ImageStyle} from 'react-native'
import {StyleService, useStyleSheet} from '@ui-kitten/components'
import {useAnswerStore} from '@providers'
import {Screen} from '@components'

export const AnswerSheetScreen: FC = observer(() => {
  const styles = useStyleSheet(themedStyles)

  const answerStore = useAnswerStore()
  const imageSource = useMemo(
    () => ({uri: `data:image/jpeg;base64,${answerStore.sheetBase64}`}),
    [answerStore.sheetBase64]
  )

  return (
    <Screen level="2" style={styles.root}>
      <Image style={styles.image as ImageStyle} source={imageSource} />
    </Screen>
  )
})

const themedStyles = StyleService.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '92%',
    aspectRatio: 0.7,
    borderWidth: 1,
    borderRadius: 3,
    resizeMode: 'contain'
  }
})
