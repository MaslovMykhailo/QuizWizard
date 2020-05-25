import React, {FC, useEffect, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {useNavigation} from '@react-navigation/native'
import {useRespondersStore, useAnswerStore} from '@providers'
import {Screen, Loader, RespondersList, ResponderInput} from '@components'
import {ResponderId} from '@types'

export const RespondersScreen: FC = observer(() => {
  const {goBack} = useNavigation()

  const answerStore = useAnswerStore()
  const respondersStore = useRespondersStore()

  useEffect(() => {
    if (!respondersStore.loaded) {
      respondersStore.load()
    }
  }, [respondersStore])

  const onResponderPress = useCallback(
    (id?: ResponderId) => {
      answerStore.changeResponderId(id)
      goBack()
    },
    [answerStore, goBack]
  )

  const onAddResponder = useCallback(
    (name: string) => respondersStore.create(name, answerStore.responderId),
    [answerStore.responderId, respondersStore]
  )

  return (
    <Screen level="2">
      {respondersStore.loaded ? (
        <>
          <ResponderInput onAddResponder={onAddResponder} />
          <RespondersList
            responders={respondersStore.responderList}
            onResponderPress={onResponderPress}
          />
        </>
      ) : (
        <Loader />
      )}
    </Screen>
  )
})
