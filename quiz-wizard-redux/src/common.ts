import {createAsyncThunk, AsyncThunkPayloadCreator} from '@reduxjs/toolkit'
import type {Services} from 'quiz-wizard-client'
import {
  useDispatch as useStoreDispatch,
  useSelector as useStoreSelector,
  useStore as useReduxStore,
  Provider
} from 'react-redux'

import type {Store, State, Dispatch} from './store'

export interface ThunkAPI {
  extra: {services: Services}
  state: State
}

export const createThunkAction = <R, A = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<R, A, ThunkAPI>
) => createAsyncThunk(typePrefix, payloadCreator)

export const useDispatch = () => useStoreDispatch<Dispatch>()
export const useSelector = <R>(selector: (s: State) => R) => useStoreSelector<State, R>(selector)
export const useStore = () => useReduxStore<Store>()

export const StoreProvider = Provider
