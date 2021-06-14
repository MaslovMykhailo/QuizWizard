import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {Platform} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import {useTranslation} from 'react-i18next'
import {Button, ButtonProps, Text} from '@ui-kitten/components'
import {DownloadIcon} from '@icons'
import {useLanguage} from '@providers'

const SHEET_FILE_NAME = 'quiz-wizard-form.pdf'
const createAnswerSheetUrl = (lng: string) =>
  `http://localhost:4000/static/answers-form/${lng}.pdf`

export const DownloadSheetButton: FC<ButtonProps> = observer((props) => {
  const [t] = useTranslation()
  const [language] = useLanguage()

  const onPress = useCallback(() => {
    if (Platform.OS === 'android') {
      RNFetchBlob.config({
        addAndroidDownloads: {
          notification: true,
          useDownloadManager: true,
          mime: 'application/pdf',
          title: SHEET_FILE_NAME,
          path: RNFetchBlob.fs.dirs.DownloadDir ?? '' + '/' + SHEET_FILE_NAME
        }
      }).fetch('GET', createAnswerSheetUrl(language))
    }
  }, [language])

  return (
    <Button {...props} onPress={onPress} accessoryLeft={DownloadIcon}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('DOWNLOAD_ANSWERS_SHEET')} />
      )}
    </Button>
  )
})
