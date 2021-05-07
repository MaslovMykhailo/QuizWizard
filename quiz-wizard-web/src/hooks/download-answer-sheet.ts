import {selectLanguage} from 'quiz-wizard-redux'
import {useCallback} from 'react'
import {useSelector} from 'react-redux'

import {downloadFile} from '../helpers'

const answerSheetFileName = 'quiz-wizard-form.pdf'

const createAnswerSheetUrl = (lng: string) =>
  `http://localhost:4000/static/answers-form/${lng}.pdf`

export const useDownloadAnswerSheet = () => {
  const lng = useSelector(selectLanguage)
  return useCallback(
    () => downloadFile(answerSheetFileName, createAnswerSheetUrl(lng)),
    [lng]
  )
}
