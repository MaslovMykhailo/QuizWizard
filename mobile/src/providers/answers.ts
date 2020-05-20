import {createContext, useContext} from 'react'
import {answersStore, AnswersStore} from '@stores'

export const AnswersContext = createContext<AnswersStore>(answersStore)

export const useAnswersStore = () => useContext(AnswersContext)

export {AnswersList} from '@stores'
