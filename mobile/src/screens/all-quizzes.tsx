import React, {FC, useCallback, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {Text} from '@ui-kitten/components'
import {useQuizzesStore} from '@providers'
import {
  Screen,
  QuizzesList,
  DeleteModal,
  useDeleteModal,
  Loader
} from '@components'
import {UUID} from '@types'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'
import {QuizzesRoute, AppRoute} from '@constants'

export const AllQuizzesScreen: FC = observer(() => {
  const [t] = useTranslation()
  const {navigate} = useNavigation()

  const quizzesStore = useQuizzesStore()

  const onQuizPress = useCallback(
    (quizId: UUID) => navigate(QuizzesRoute.Quiz, {quizId}),
    [navigate]
  )

  const onCopyQuizPress = useCallback(
    (quizId: UUID) => navigate(QuizzesRoute.NewQuiz, {quizId}),
    [navigate]
  )

  const onAddQuizAnswersPress = useCallback(
    (quizId: UUID) => navigate(AppRoute.AnswersDetection, {quizId}),
    [navigate]
  )

  const quizIdToDeleteRef = useRef<UUID | null>(null)
  const onDeleteQuiz = useCallback(() => {
    if (quizIdToDeleteRef.current) {
      quizzesStore.remove(quizIdToDeleteRef.current)
    }
  }, [quizzesStore])

  const {onOpenDeleteModal, ...deleteModalProps} = useDeleteModal(onDeleteQuiz)

  const onDeleteQuizPress = useCallback(
    (quizId: UUID) => {
      quizIdToDeleteRef.current = quizId
      onOpenDeleteModal()
    },
    [onOpenDeleteModal]
  )

  return (
    <Screen level="3">
      {!quizzesStore.loaded ? (
        <Loader />
      ) : (
        <QuizzesList
          quizzes={quizzesStore.quizzesList}
          onQuizPress={onQuizPress}
          onAddQuizAnswersPress={onAddQuizAnswersPress}
          onCopyQuizPress={onCopyQuizPress}
          onDeleteQuizPress={onDeleteQuizPress}
        />
      )}
      <DeleteModal {...deleteModalProps}>
        <Text
          children={t<string>('DELETE_QUIZ_CONFIRMATION_TEXT', {
            quiz: quizIdToDeleteRef.current
              ? quizzesStore.getQuizById(quizIdToDeleteRef.current)?.name ?? ''
              : ''
          })}
        />
      </DeleteModal>
    </Screen>
  )
})
