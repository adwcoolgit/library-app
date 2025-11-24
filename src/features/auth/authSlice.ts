import queryClient from '@/lib/reactQuery';
import { User } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  isLogin: boolean;
}

interface credentialsProps {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  status: 'idle',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.isLogin = false;
      queryClient.clear();
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload.valueOf();
    },
  },
});

export const { setUser, setIsLogin, logout } = authSlice.actions;
export default authSlice.reducer;
