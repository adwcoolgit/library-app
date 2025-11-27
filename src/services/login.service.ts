import { setIsLogin, setUser } from '@/features/auth/authSlice';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/reactQuery';
import { setItemWitExpiry } from '@/lib/storages';
import { LoginPayload } from '@/schemas/login.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getUserQueryKey } from './hooks/useUser';
import { LoginResponse } from '@/types/login-response.type';
import { User } from '@/types/user.type';
import { ApiResponse } from '@/types/response.type';
import axios from 'axios';
import { RootState } from '@/app/library';
import { showToast } from '@/features/ui/uiSlice';

export async function loginService(
  params: LoginPayload
): Promise<LoginResponse> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/api/auth/login',
      params
    );
    return data.data;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   throw {
    //     status: error.response?.status,
    //     message: error.response?.data?.message,
    //   };
    // }
    throw error;
  }
}

type UseLoginParams = {
  mutationConfig?: MutationConfig<typeof loginService>;
};

export const useLoginService = (params: UseLoginParams = {}) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginService,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (isLogin) return;

      if (!data.token) {
        // 'Login succes but failed to get token';
        return;
      }

      const ttl = 1000 * 60 * 10;

      setItemWitExpiry({
        key: loginTokenStorageKey(),
        value: data.token,
        ttl: ttl,
      });

      setItemWitExpiry({
        key: loginUserStorageKey(),
        value: JSON.stringify(data.user),
        ttl: ttl,
      });

      dispatch(setUser(data.user));
      dispatch(setIsLogin(true));
      queryClient.setQueryData<User>(getUserQueryKey, data.user);

      axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;

      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
    onError: (error) => {
      let message: string = ' Somthing went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch(showToast(message));
    },
    retry: false,
  });
};

export const loginUserStorageKey = () => 'user';
export const loginTokenStorageKey = () => 'token';
