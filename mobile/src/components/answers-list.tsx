import React, {FC, useCallback, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {SectionList, View, SectionListData} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useAnswersStore} from '@providers'
import {
  ListItem,
  Text,
  Divider,
  StyleService,
  useStyleSheet,
  Button
} from '@ui-kitten/components'
import {KeypadIcon, TrashIcon} from '@icons'
import {keyExtractor} from '@utils'
import {Answer, UUID} from '@types'

import {useDeleteModal, DeleteModal} from './delete-modal'

export interface AnswersListProps {
  onAnswerPress(answerId: UUID): void
}

export const AnswersList: FC<AnswersListProps> = observer(({onAnswerPress}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const answersStore = useAnswersStore()

  const answerIdToDeleteRef = useRef<UUID | null>(null)
  const onDeleteAnswer = useCallback(() => {
    const answerId = answerIdToDeleteRef.current
    if (answerId) {
      answersStore.remove(answerId)
    }
  }, [answersStore])

  const {onOpenDeleteModal, ...deleteModalProps} = useDeleteModal(
    onDeleteAnswer
  )

  const renderItem = useCallback(
    ({item: {id, name, creationDate}}: {item: Answer}) => (
      <ListItem
        title={name}
        description={creationDate.toLocaleDateString()}
        onPress={() => requestAnimationFrame(() => onAnswerPress(id))}
        accessoryLeft={KeypadIcon}
        accessoryRight={(props) => (
          <Button
            {...props}
            status="danger"
            appearance="ghost"
            accessoryLeft={TrashIcon}
            onPress={() =>
              requestAnimationFrame(() => {
                answerIdToDeleteRef.current = id
                onOpenDeleteModal()
              })
            }
          />
        )}
      />
    ),
    [onAnswerPress, onOpenDeleteModal]
  )

  const renderSectionHeader = useCallback(
    ({
      section: {
        quiz: {name}
      }
    }: {
      section: SectionListData<Answer>
    }) => (
      <View style={styles.sectionHeader}>
        <Text category="h5" children={name} />
      </View>
    ),
    [styles.sectionHeader]
  )

  const renderListEmpty = useCallback(
    () => (
      <View style={[styles.wrapper, styles.noAnswersWrapper]}>
        <Text category="h4" children={t<string>('NO_ANSWERS_TITLE')} />
        <Text
          appearance="hint"
          category="h6"
          children={t<string>('NO_ANSWERS_SUBTITLE')}
        />
      </View>
    ),
    [styles.noAnswersWrapper, styles.wrapper, t]
  )

  return (
    <>
      <SectionList
        sections={answersStore.answersList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={renderListEmpty}
        renderSectionHeader={renderSectionHeader}
      />
      <DeleteModal {...deleteModalProps}>
        <Text
          children={t<string>('DELETE_ANSWER_CONFIRMATION_TEXT', {
            answer: answerIdToDeleteRef.current
              ? answersStore.getAnswerById(answerIdToDeleteRef.current)?.name
              : ''
          })}
        />
      </DeleteModal>
    </>
  )
})

const themedStyles = StyleService.create({
  sectionHeader: {
    paddingLeft: 24,
    paddingVertical: 12
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noAnswersWrapper: {
    marginTop: 12
  }
})
