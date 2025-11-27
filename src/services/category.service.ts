import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/reactQuery';
import { CategoriesResponse } from '@/types/categories-response.type';
import { ApiResponse } from '@/types/response.type';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

export async function categoryService(): Promise<CategoriesResponse> {
  const { data } =
    await axiosInstance.get<ApiResponse<CategoriesResponse>>('/api/categories');

  return data.data as CategoriesResponse;
}

export const categoriesQueryOption = () => {
  return queryOptions({
    queryKey: categoryQueryKey(),
    queryFn: categoryService,
    staleTime: 1000 * 60,
  });
};

export type UseCategoriesParam = {
  queryConfig?: QueryConfig<typeof categoriesQueryOption>;
};

export const categoryStorageKey = () => 'category';
export const categoryQueryKey = () => ['category'];
