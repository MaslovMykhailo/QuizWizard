import {createContext, useContext} from 'react'
import {AnswerStore} from '@stores'

export const AnswerContext = createContext<AnswerStore>(new AnswerStore())

export const AnswerStoreProvider = AnswerContext.Provider

export const useAnswerStore = () => useContext(AnswerContext)
