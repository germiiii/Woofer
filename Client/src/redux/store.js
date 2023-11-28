import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from '../features/counterSlice'
import userDetailSlice from '../features/userDetailSlice';

export const store = configureStore({
  reducer: {
    counter: CounterReducer, //counter is the name given at counterSlice
    userDetail: userDetailSlice
  },
})

