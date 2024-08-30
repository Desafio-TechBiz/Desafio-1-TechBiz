import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Slices/menuSlice';
import newNodeReducer from './Slices/newNodeSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    node: newNodeReducer
  },
});
export default store