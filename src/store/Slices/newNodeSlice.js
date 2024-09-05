import { createSlice } from '@reduxjs/toolkit';

const newNodeSlice = createSlice({
  name: 'node',
  initialState: {
    node: null
  },
  reducers: {
    createNode: (state, action) => {
    console.log('action',action.payload)
      const node = action.payload;
      // Verifica se o botão clicado já está ativado
      state.node = node;
    }
  }
});

export const { createNode } = newNodeSlice.actions;
export default newNodeSlice.reducer;
