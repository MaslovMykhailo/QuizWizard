import {createStore} from 'redux'

export type IncrementAction = {
  type: 'INCREMENT'
}

export const increment = (): IncrementAction => ({
  type: 'INCREMENT'
})

export type DecrementAction = {
  type: 'DECREMENT'
}

export const decrement = (): DecrementAction => ({
  type: 'DECREMENT'
})

export type Action = IncrementAction | DecrementAction;

function counterReducer(state = {value: 0}, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return {value: state.value + 1}
    case 'DECREMENT':
      return {value: state.value - 1}
    default:
      return state
  }
}

export const createQuizWizardStore = () => createStore(counterReducer)