import { setRegister } from '@/features/auth/registerSlice';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/reactQuery';
import { setItemWitExpiry } from '@/lib/storages';
import { RegisterPayload } from '@/schemas/register.schema';
import { RegisterResponse } from '@/types/register-response.type';
import { ApiResponse } from '@/types/response.type';
import { User } from '@/types/user.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { getUserQueryKey } from './hooks/useUser';
import axios from 'axios';
import { showToast } from '@/features/ui/uiSlice';

export async function registerService(
  params: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await axiosInstance.post<ApiResponse<RegisterResponse>>(
    '/api/auth/register',
    params
  );

  return data.data;
}

type UseRegisterParam = {
  mutationConfig?: MutationConfig<typeof registerService>;
};

export const useRegisterService = (params: UseRegisterParam = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerService,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (!data.email) {
        return;
      }

      const ttl = 1000 * 60 * 10;

      setItemWitExpiry({
        key: registerUserStorageKey(),
        value: JSON.stringify(data),
        ttl: ttl,
      });

      // dispatch(setRegister(data))

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
    onError: (error) => {
      let message: string = 'Something went wrong';

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

export const registerUserStorageKey = () => 'register-user';
