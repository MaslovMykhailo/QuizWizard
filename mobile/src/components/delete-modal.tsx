import React, {FC, useState, useCallback} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Card,
  Modal,
  Text,
  StyleService,
  useStyleSheet,
  ModalProps,
  Button
} from '@ui-kitten/components'

export interface DeleteModalProps extends ModalProps {
  onAccept?(): void
  onDecline?(): void
}

export const DeleteModal: FC<DeleteModalProps> = ({
  onAccept,
  onDecline,
  ...props
}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <Modal {...props} backdropStyle={styles.backdrop}>
      <Card
        disabled
        status="danger"
        header={(headerProps) => (
          <Text
            {...headerProps}
            category="h4"
            children={t<string>('DELETE_MODAL_TITLE')}
          />
        )}
        footer={(footerProps) => (
          <View {...footerProps} style={[styles.footer, footerProps?.style]}>
            <Button
              size="small"
              onPress={onDecline}
              children={t<string>('DELETE_DIALOG_DECLINE')}
            />
            <Button
              size="small"
              status="danger"
              onPress={onAccept}
              children={t<string>('DELETE_DIALOG_ACCEPT')}
            />
          </View>
        )}>
        {props.children}
      </Card>
    </Modal>
  )
}

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

type DeleteModalHookPayload = Partial<DeleteModalProps> & {
  onOpenDeleteModal(): void
}

export const useDeleteModal = (
  onDelete: () => void
): DeleteModalHookPayload => {
  const [visible, setVisible] = useState(false)

  const onOpenDeleteModal = useCallback(
    () => requestAnimationFrame(() => setVisible(true)),
    []
  )
  const onCloseDeleteModal = useCallback(
    () => requestAnimationFrame(() => setVisible(false)),
    []
  )

  const onAccept = useCallback(() => {
    onCloseDeleteModal()
    requestAnimationFrame(onDelete)
  }, [onCloseDeleteModal, onDelete])

  const onDecline = onCloseDeleteModal
  const onBackdropPress = onCloseDeleteModal

  return {
    onOpenDeleteModal,
    visible,
    onAccept,
    onDecline,
    onBackdropPress
  }
}
