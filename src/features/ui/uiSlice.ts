import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  showLoginModal: boolean;
  toastMessage: string | null;
  categoryId: number | undefined;
  q: string | undefined;
  authorId: number | undefined;
}

const initialState: UIState = {
  showLoginModal: false,
  toastMessage: null,
  categoryId: undefined,
  q: undefined,
  authorId: undefined,
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
    categoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    booksTitle: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    authorId: (state, action: PayloadAction<number>) => {
      state.authorId = action.payload;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  showToast,
  hideToast,
  categoryId,
  booksTitle,
  authorId,
} = uiSlice.actions;
export default uiSlice.reducer;
