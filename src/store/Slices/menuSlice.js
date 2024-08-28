import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    target: false,
    route: false,
    zoomIn: false,
    zoomOut: false,
    expand: false,
    download: false,
    filter: false
  },
  reducers: {
    toggleButton: (state, action) => {
      const button = action.payload;
      // Verifica se o botão clicado já está ativado
      const isActive = state[button];
      // Desativa todos os botões
      for (let key in state) {
        state[key] = false;
      }
      // Ativa o botão apenas se não estava ativo
      state[button] = !isActive;
    }
  }
});

export const { toggleButton } = menuSlice.actions;
export default menuSlice.reducer;
