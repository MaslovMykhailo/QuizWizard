import React, {FC, useCallback, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {Spinner, StyleService, useStyleSheet, Text} from '@ui-kitten/components'
import {useQuizzesStore} from '@providers'
import {Screen, QuizzesList, DeleteModal, useDeleteModal} from '@components'
import {UUID} from '@types'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'
import {QuizzesRoute} from '@constants'

export const AllQuizzesScreen: FC = observer(() => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)
  const {navigate} = useNavigation()

  const quizzesStore = useQuizzesStore()
  const resource = quizzesStore.quizzes

  const onQuizPress = useCallback(
    (quizId: UUID) => navigate(QuizzesRoute.Quiz, {quizId}),
    [navigate]
  )

  const onCopyQuizPress = useCallback(
    (quizId: UUID) => navigate(QuizzesRoute.NewQuiz, {quizId}),
    [navigate]
  )

  const [quizIdToDelete, setQuizIdToDelete] = useState<UUID | undefined>()
  const onDeleteQuiz = useCallback(() => {
    if (quizIdToDelete) {
      quizzesStore.remove(quizIdToDelete)
    }
  }, [quizIdToDelete, quizzesStore])

  const {onOpenDeleteModal, ...deleteModalProps} = useDeleteModal(onDeleteQuiz)

  const onDeleteQuizPress = useCallback(
    (quizId: UUID) => {
      setQuizIdToDelete(quizId)
      onOpenDeleteModal()
    },
    [onOpenDeleteModal]
  )

  return (
    <Screen level="2">
      {!resource.initialized || (resource.loading && !resource.data) ? (
        <View style={styles.loaderWrapper}>
          <Spinner size="giant" />
        </View>
      ) : (
        <QuizzesList
          quizzes={quizzesStore.quizzesList}
          onQuizPress={onQuizPress}
          onShowQuizAnswersPress={() => {}}
          onCopyQuizPress={onCopyQuizPress}
          onDeleteQuizPress={onDeleteQuizPress}
        />
      )}
      <DeleteModal {...deleteModalProps}>
        <Text
          children={t<string>('DELETE_QUIZ_CONFIRMATION_TEXT', {
            quiz: quizIdToDelete
              ? quizzesStore.getQuizById(quizIdToDelete).get()?.name ?? ''
              : ''
          })}
        />
      </DeleteModal>
    </Screen>
  )
})

const themedStyles = StyleService.create({
  loaderWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
