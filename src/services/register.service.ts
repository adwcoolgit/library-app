import { axiosInstance } from '@/lib/axios';
import { RegisterPayload } from '@/schemas/register.schema';
import { RegisterResponse } from '@/types/register-response.type';
import { ApiResponse } from '@/types/response.type';

export async function RegisterService(
  params: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await axiosInstance.post<ApiResponse<RegisterResponse>>(
    '/api/auth/register',
    params
  );

  return data.data;
}
