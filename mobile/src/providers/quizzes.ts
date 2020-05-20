import {createContext, useContext} from 'react'
import {quizzesStore, QuizzesStore} from '@stores'

export const QuizzesContext = createContext<QuizzesStore>(quizzesStore)

export const useQuizzesStore = () => useContext(QuizzesContext)
