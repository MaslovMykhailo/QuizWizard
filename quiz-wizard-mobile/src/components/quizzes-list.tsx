import React, {FC, useCallback, memo} from 'react'
import {View, ViewProps} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  List,
  ListItem,
  Button,
  Divider,
  StyleService,
  useStyleSheet,
  Text
} from '@ui-kitten/components'
import {FileTextIcon, CheckmarkCircleIcon, CopyIcon, TrashIcon} from '@icons'
import {keyExtractor} from '@utils'
import {Quiz, UUID} from '@types'

import {AddQuizButton} from './add-quiz-button'

export interface QuizzesListProps {
  quizzes: Quiz[]
  onQuizPress(quizId: UUID): void
  onAddQuizAnswersPress?(quizId: UUID): void
  onCopyQuizPress?(quizId: UUID): void
  onDeleteQuizPress?(quizId: UUID): void
}

export const QuizzesList: FC<QuizzesListProps> = memo(
  ({
    quizzes,
    onQuizPress,
    onAddQuizAnswersPress,
    onCopyQuizPress,
    onDeleteQuizPress
  }) => {
    const [t] = useTranslation()
    const styles = useStyleSheet(themedStyles)

    const renderQuizActions = useCallback(
      ({quizId, ...viewProps}: ViewProps & {quizId: UUID}) => (
        <View {...viewProps} style={[viewProps.style, styles.actions]}>
          {onAddQuizAnswersPress && (
            <Button
              status="success"
              appearance="ghost"
              style={styles.action}
              accessoryLeft={CheckmarkCircleIcon}
              onPress={() =>
                requestAnimationFrame(() => onAddQuizAnswersPress(quizId))
              }
            />
          )}
          {onCopyQuizPress && (
            <Button
              appearance="ghost"
              style={styles.action}
              accessoryLeft={CopyIcon}
              onPress={() =>
                requestAnimationFrame(() => onCopyQuizPress(quizId))
              }
            />
          )}
          {onDeleteQuizPress && (
            <Button
              status="danger"
              appearance="ghost"
              style={styles.action}
              accessoryLeft={TrashIcon}
              onPress={() =>
                requestAnimationFrame(() => onDeleteQuizPress(quizId))
              }
            />
          )}
        </View>
      ),
      [
        onCopyQuizPress,
        onDeleteQuizPress,
        onAddQuizAnswersPress,
        styles.action,
        styles.actions
      ]
    )

    const renderQuiz = useCallback(
      ({item: {id, name, creationDate}}: {item: Quiz}) => (
        <ListItem
          title={name}
          description={creationDate.toLocaleDateString()}
          onPress={() => requestAnimationFrame(() => onQuizPress(id))}
          accessoryLeft={FileTextIcon}
          accessoryRight={(viewProps) =>
            renderQuizActions({quizId: id, ...viewProps})
          }
        />
      ),
      [onQuizPress, renderQuizActions]
    )

    const renderListEmpty = useCallback(
      () => (
        <View style={[styles.wrapper, styles.noQuizzesWrapper]}>
          <Text category="h6" children={t<string>('NO_QUIZZES_TITLE')} />
          <Text
            appearance="hint"
            category="s1"
            children={t<string>('NO_QUIZZES_SUBTITLE')}
          />
        </View>
      ),
      [styles.noQuizzesWrapper, styles.wrapper, t]
    )

    return (
      <>
        <List
          data={quizzes}
          keyExtractor={keyExtractor}
          renderItem={renderQuiz}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={renderListEmpty}
        />
        <View style={[styles.wrapper, styles.addNewQuizWrapper]}>
          <AddQuizButton />
        </View>
      </>
    )
  }
)

const themedStyles = StyleService.create({
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 108
  },
  action: {
    width: 24
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noQuizzesWrapper: {
    marginTop: 12
  },
  addNewQuizWrapper: {
    marginTop: 12
  }
})
