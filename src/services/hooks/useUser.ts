import { User } from '@/types/user.type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { libraryApi } from '../user.service';

export const useUser = (): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: getUserQueryKey,
    queryFn: () => libraryApi.getUserProfile({}),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const getUserQueryKey = ['user'];
