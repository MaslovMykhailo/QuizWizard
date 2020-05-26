import React, {FC, useCallback} from 'react'
import {Platform} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import {useTranslation} from 'react-i18next'
import {Button, ButtonProps, Text} from '@ui-kitten/components'
import {DownloadIcon} from '@icons'

const SHEET_FILE_NAME = 'QuizWizardAnswerSheet.pdf'
const SHEET_PATH =
  'https://quizwizardweb20200524070904.azurewebsites.net/api/images/QuizWizardBlankV2.pdf'

export const DownloadSheetButton: FC<ButtonProps> = (props) => {
  const [t] = useTranslation()

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
      }).fetch('GET', SHEET_PATH)
    }
  }, [])

  return (
    <Button {...props} onPress={onPress} accessoryLeft={DownloadIcon}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('DOWNLOAD_ANSWERS_SHEET')} />
      )}
    </Button>
  )
}
