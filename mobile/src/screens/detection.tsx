import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useNavigation} from '@react-navigation/native'
import {DetectionRoutes} from '@constants'

export const DetectionScreen = observer(() => {
  const {navigate} = useNavigation()

  useEffect(() => navigate(DetectionRoutes.NewAnswer), [navigate])

  return null
})
