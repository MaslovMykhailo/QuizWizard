import React, {FC, useCallback, memo} from 'react'
import {View, ViewProps} from 'react-native'
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
import {Quiz, UUID} from '@types'
import {useTranslation} from 'react-i18next'

import {AddQuizButton} from './add-quiz-button'

export interface QuizzesListProps {
  quizzes: Quiz[]
  onQuizPress(quizId: UUID): void
  onShowQuizAnswersPress(quizId: UUID): void
  onCopyQuizPress(quizId: UUID): void
  onDeleteQuizPress(quizId: UUID): void
}

export const QuizzesList: FC<QuizzesListProps> = memo(
  ({
    quizzes,
    onQuizPress,
    onShowQuizAnswersPress,
    onCopyQuizPress,
    onDeleteQuizPress
  }) => {
    const [t] = useTranslation()
    const styles = useStyleSheet(themedStyles)

    const renderQuizActions = useCallback(
      ({quizId, ...viewProps}: ViewProps & {quizId: UUID}) => (
        <View {...viewProps} style={[viewProps.style, styles.actions]}>
          <Button
            status="success"
            appearance="ghost"
            style={styles.action}
            accessoryLeft={CheckmarkCircleIcon}
            onPress={() =>
              requestAnimationFrame(() => onShowQuizAnswersPress(quizId))
            }
          />
          <Button
            appearance="ghost"
            style={styles.action}
            accessoryLeft={CopyIcon}
            onPress={() => requestAnimationFrame(() => onCopyQuizPress(quizId))}
          />
          <Button
            status="danger"
            appearance="ghost"
            style={styles.action}
            accessoryLeft={TrashIcon}
            onPress={() =>
              requestAnimationFrame(() => onDeleteQuizPress(quizId))
            }
          />
        </View>
      ),
      [
        onCopyQuizPress,
        onDeleteQuizPress,
        onShowQuizAnswersPress,
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

    return (
      <>
        <List
          data={quizzes}
          renderItem={renderQuiz}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={() => (
            <View style={[styles.wrapper, styles.noQuizzesWrapper]}>
              <Text category="h4" children={t<string>('NO_QUIZZES_TITLE')} />
              <Text
                appearance="hint"
                category="h6"
                children={t<string>('NO_QUIZZES_SUBTITLE')}
              />
            </View>
          )}
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
