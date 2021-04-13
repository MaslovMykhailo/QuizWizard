import {FC} from 'react'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {createQuizWizardStore, decrement, increment} from 'quiz-wizard-redux' 

export const App: FC = () => {
  return (
    <>
      <h2 children="QuizWizard" />
      <Store>
        <Counter />
      </Store>
    </>
  )
}

const store = createQuizWizardStore()

const Store: FC = (props) => {
  return (
    <Provider
      store={store}
      {...props}
    />
  )
}

const Counter: FC = () => {
  const value = useSelector(state => (state as {value: number}).value)

  const dispatch = useDispatch()

  const onIncrement = () => dispatch(increment())
  const onDecrement = () => dispatch(decrement())

  return (
    <div>
      <button
        onClick={onIncrement}
        children="Increment"
      />
      <br />
      {value}
      <br />
      <button
        onClick={onDecrement}
        children="Decrement"
      />
    </div>
  )
}
