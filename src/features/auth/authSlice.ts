import queryClient from '@/lib/reactQuery';
import { LoginResponse } from '@/lib/types/login-response.type';
import { User } from '@/lib/types/user.type';
import { LoginPayload } from '@/schemas/login.schema';
import { loginService } from '@/services/login.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boolean } from 'zod';

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

// Tidak digunakan karena sudah menggunaka useMutation dari tanstack query
// export const login = createAsyncThunk(
//   'auth/login',
//   async (payload: LoginPayload) => {
//     const data = await loginService(payload);

//     queryClient.invalidateQueries({ queryKey: ['user'] });
//     return data;
//   }
// );

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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload.valueOf();
    },
  },

  // Tidak digunakan karena sudah menggunaka useMutation dari tanstack query
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.pending, (state) => {
  //       state.loading = true;
  //       state.status = 'loading';
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //       state.loading = true;
  //       state.status = 'success';
  //       state.isLogin = true;
  //     })
  //     .addCase(login.rejected, (state) => {
  //       state.loading = false;
  //       state.status = 'error';
  //     });
  // },
});

export const { setUser, setIsLogin, logout } = authSlice.actions;
export default authSlice.reducer;
