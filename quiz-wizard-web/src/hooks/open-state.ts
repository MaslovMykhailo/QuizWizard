import {useCallback, useState} from 'react'

export type OpenStateOptions = {
  initialOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const useOpenState = ({
  initialOpen = false,
  onOpen,
  onClose
}: OpenStateOptions = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const isClose = !isOpen

  const open = useCallback(
    () => {
      setIsOpen(true)
      onOpen?.()
    },
    [onOpen]
  )
  const close = useCallback(
    () => {
      setIsOpen(false)
      onClose?.()
    },
    [onClose]
  )

  return {isOpen, isClose, open, close}
}
