import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectValue } from '../../redux/features/counterSlice'

const Counter = () => {
  const count = useSelector(selectValue)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter;