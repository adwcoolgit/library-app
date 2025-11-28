import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/reactQuery';
import { AuthorResponse } from '@/types/author-response.type';
import { ApiResponse } from '@/types/response.type';
import { queryOptions } from '@tanstack/react-query';

export async function authorService(): Promise<AuthorResponse> {
  const { data } =
    await axiosInstance.get<ApiResponse<AuthorResponse>>('/api/authors');

  return data.data as AuthorResponse;
}

export const authorQueryOption = () => {
  return queryOptions({
    queryKey: authorQueryKey(),
    queryFn: authorService,
    staleTime: 1000 * 60,
  });
};

export type UseAuthorParam = {
  queryConfig?: QueryConfig<typeof authorQueryOption>;
};

export const authorStorageKey = () => 'author';
export const authorQueryKey = () => ['author'];
