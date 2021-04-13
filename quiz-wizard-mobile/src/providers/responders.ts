import {createContext, useContext} from 'react'
import {respondersStore, RespondersStore} from '@stores'

export const RespondersContext = createContext<RespondersStore>(respondersStore)

export const useRespondersStore = () => useContext(RespondersContext)
