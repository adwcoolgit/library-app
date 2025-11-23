import { configureStore } from '@reduxjs/toolkit';
import authRducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';

export const library = configureStore({
  reducer: {
    auth: authRducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof library.getState>;
export type AppDispatch = typeof library.dispatch;
