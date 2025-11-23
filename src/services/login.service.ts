import { setIsLogin, setUser } from '@/features/auth/authSlice';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/reactQuery';
import { setItemWitExpiry } from '@/lib/storages';
import { LoginPayload } from '@/schemas/login.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { getUserQueryKey } from './hooks/useUser';
import { LoginResponse } from '@/types/login-response.type';
import { User } from '@/types/user.type';
import { ApiResponse } from '@/types/response.type';

export async function loginService(
  params: LoginPayload
): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>(
    '/api/auth/login',
    params
  );

  return data.data;
}

type UseLoginParams = {
  mutationConfig?: MutationConfig<typeof loginService>;
};

export const useLoginService = (params: UseLoginParams = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginService,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (!data.token) {
        console.warn('Login succes but failed to get token');
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
  });
};

export const loginUserStorageKey = () => 'user';
export const loginTokenStorageKey = () => 'token';
