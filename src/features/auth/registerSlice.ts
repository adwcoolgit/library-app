import { User } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  user: User | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'succes' | 'error';
}

const initialState: RegisterState = {
  user: null,
  loading: false,
  status: 'idle',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegister: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setRegister } = registerSlice.actions;
export default registerSlice.reducer;
