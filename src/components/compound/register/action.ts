import { AppDispatch } from '@/app/store';
import { AuthContext } from '@/contexts/auth.context';
import { RegisterPayload, registerSchema } from '@/schemas/register.schema';
import { useRegister } from '@/services/hooks/useRegister';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export const useRegisterAction = () => {
  const dispatch = useDispatch();
  const { setDialog } = useContext(AuthContext);
  const {
    mutateAsync: loginMutate,
    isPending,
    isSuccess,
    ...props
  } = useRegister();

  // Gunakan useCallback , mencegah submitForm dibuat ulang setiap render, menghemat re-render di komponen yang
  const submitForm = useCallback(
    async (data: RegisterPayload) => {
      const result = registerSchema.safeParse(data);

      if (!result.success) {
        return { success: false, message: 'There something went wrong' };
      }

      try {
        // Kalau login adalah createAsyncThunk, .unwrap() akan lempar error secara langsung kalau gagal,
        // await dispatch(login(data)).unwrap();
        const res = await loginMutate(data);

        setDialog(undefined);
      } catch (error) {
        // Login Error
        return { success: false, message: 'Login failed, please try again' };
      }

      return { success: true, message: 'Request submitted' };
    },
    [loginMutate, setDialog]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
