import {createContext, useContext} from 'react'
import {QuizzesStore, quizzesStore} from '@stores'

type QuizzesContextValue = {
  store: QuizzesStore
}

export const QuizzesContext = createContext<QuizzesContextValue>({
  store: quizzesStore
})

export const useQuizzesStore = () => useContext(QuizzesContext).store
