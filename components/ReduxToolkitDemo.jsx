import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
    set: (state, action) => { state.value = action.payload },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>Tăng</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>Giảm</button>
      <input type="number" onChange={e => dispatch(counterSlice.actions.set(Number(e.target.value)))} />
    </div>
  );
}

export default function ReduxToolkitDemo() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}