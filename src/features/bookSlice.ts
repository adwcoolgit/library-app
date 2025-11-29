import { createSlice } from '@reduxjs/toolkit';

interface queryFilter {
  bookId?: number | null;
}

const initialState: queryFilter = {
  bookId: null,
};

const bookDetailSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getDetailBook: (state, action) => {
      state.bookId = action.payload;
    },
  },
});

export const { getDetailBook } = bookDetailSlice.actions;
export default bookDetailSlice.reducer;
