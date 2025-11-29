import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  showAuthModal: boolean;
  toastMessage: string | null;
  categoryId: number | null;
  q: string | null;
  authorId: number | null;
  menu: boolean;
  search: boolean;
}

const initialState: UIState = {
  showAuthModal: false,
  toastMessage: null,
  categoryId: null,
  q: null,
  authorId: null,
  menu: false,
  search: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.showAuthModal = true;
    },
    closeAuthModal: (state) => {
      state.showAuthModal = false;
    },
    showToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    hideToast: (state) => {
      state.toastMessage = null;
    },
    isVisibleMenu: (state, action: PayloadAction<boolean>) => {
      state.menu = action.payload;
    },
    isVisibleSearch: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  showToast,
  hideToast,
  isVisibleMenu,
  isVisibleSearch,
} = uiSlice.actions;
export default uiSlice.reducer;
