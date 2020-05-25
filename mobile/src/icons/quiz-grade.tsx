import React, {FC, memo} from 'react'
import {ViewProps, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Text} from '@ui-kitten/components'

export interface QuizGradeProps extends ViewProps {
  grade: number
}

export const QuizGrade: FC<QuizGradeProps> = memo(({grade, ...props}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <View {...props}>
      <Text category="h6" children={t<string>('GRADE_CAPTION')} />
      <Text
        category="h5"
        style={styles.grade}
        status={getGradeStatus(grade)}
        children={getGradePercent(grade)}
      />
    </View>
  )
})

const themedStyles = StyleService.create({
  grade: {
    marginTop: 6
  }
})

const getGradePercent = (grade: number) => `${Math.round(grade * 10000) / 100}%`

const getGradeStatus = (grade: number) => {
  if (grade < 0.25) {
    return 'danger'
  }

  if (grade < 0.5) {
    return 'warning'
  }

  if (grade < 0.75) {
    return 'primary'
  }

  return 'success'
}
