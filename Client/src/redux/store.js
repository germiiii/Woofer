import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './features/counterSlice'
import DetailReducer from './features/detailSice'

export const store = configureStore({
  reducer: {
    counter: CounterReducer, //counter is the name given at counterSlice
    userDetail: DetailReducer
  },
})

