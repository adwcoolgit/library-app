import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  showLoginModal: boolean;
  toastMessage: string | null;
}

const initialState: UIState = {
  showLoginModal: false,
  toastMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.showLoginModal = true;
    },
    closeLoginModal: (state) => {
      state.showLoginModal = false;
    },
    showToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    hideToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const { openLoginModal, closeLoginModal, showToast, hideToast } =
  uiSlice.actions;
export default uiSlice.reducer;
