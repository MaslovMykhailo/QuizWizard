import {createContext, useContext} from 'react'
import {QuizStore} from '@stores'

export const QuizContext = createContext<QuizStore>(new QuizStore())

export const QuizStoreProvider = QuizContext.Provider

export const useQuizStore = () => useContext(QuizContext)
