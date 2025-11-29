import { createSlice } from '@reduxjs/toolkit';

interface queryFilter {
  categoryId?: number | null;
  authorId?: number | null;
  q?: string | null;
  page?: number | null;
  limit?: number | null;
}

const initialState: queryFilter = {
  categoryId: null,
  authorId: null,
  q: null,
  page: null,
  limit: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateBooks: (state, action) => {
      state.authorId = action.payload.authorId;
      state.categoryId = action.payload.categoryId;
      state.q = action.payload.q;
      state.limit = action.payload.limit;
      state.page = action.payload.page;
    },
  },
});

export const { updateBooks } = booksSlice.actions;
export default booksSlice.reducer;
