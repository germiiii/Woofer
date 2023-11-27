import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './features/counterSlice'
import userDetailSlice from './features/detailSlice';

export const store = configureStore({
  reducer: {
    counter: CounterReducer, //counter is the name given at counterSlice
    userDetail: userDetailSlice
  },
})

