import { axiosInstance } from '@/lib/axios';
import { User } from '@/types/user.type';

export const libraryApi = {
  getUserProfile: async (params: any): Promise<User> => {
    const result = await axiosInstance.get('/api/me');
    return result.data;
  },
};
