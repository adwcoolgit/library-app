import { AuthContext } from '@/contexts/auth.context';
import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { useLogin } from '@/services/hooks/useLogin';
import { useCallback, useContext } from 'react';

export const useLoginAction = () => {
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
        const res = await loginMutate(data);
        // console.log(res);
        setDialog(undefined);
      } catch (error) {
        return { success: false, message: 'Login failed, please try again' };
      }

      return { success: true, message: 'Request submitted' };
    },
    [loginMutate, setDialog]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
