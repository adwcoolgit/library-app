import { AppDispatch } from '@/app/library';
import { AuthContext } from '@/contexts/auth.context';
import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { useLogin } from '@/services/hooks/useLogin';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export const useLoginAction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setDialog } = useContext(AuthContext);
  const {
    mutateAsync: loginMutate,
    isPending,
    isSuccess,
    ...props
  } = useLogin();

  // Gunakan useCallback , mencegah submitForm dibuat ulang setiap render, menghemat re-render di komponen yang
  const submitForm = useCallback(
    async (data: LoginPayload) => {
      const result = loginSchema.safeParse(data);

      if (!result.success) {
        return { success: false, message: 'There something went wrong' };
      }

      try {
        // Kalau login adalah createAsyncThunk, .unwrap() akan lempar error secara langsung kalau gagal,
        // await dispatch(login(data)).unwrap();
        const res = await loginMutate(data);

        setDialog(undefined);
      } catch (error) {
        console.error('Login Error: ', error);
        return { success: false, message: 'Login failed, please try again' };
      }

      return { success: true, message: 'Request submitted' };
    },
    [loginMutate, setDialog]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
