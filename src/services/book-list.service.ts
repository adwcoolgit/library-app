import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/reactQuery';
import { BooksResponse } from '@/types/book-response-type';
import { ApiResponse } from '@/types/response.type';
import { infiniteQueryOptions } from '@tanstack/react-query';

export type BookListQueryProps = {
  q?: string;
  categoryId?: number;
  authorId?: number;
  page?: number;
  limit?: number;
};

export async function bookService(
  params: BookListQueryProps
): Promise<BooksResponse> {
  const { data } = await axiosInstance.get<ApiResponse<BooksResponse>>(
    'api/books',
    { params }
  );

  return data.data as BooksResponse;
}

export const getInfiniteBoooksQueryOption = (params: BookListQueryProps) => {
  return infiniteQueryOptions({
    queryKey: bookQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return bookService(params);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.page === lastPage?.pagination?.totalPages)
        return undefined;
      const nextPage = lastPage.pagination.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export type UseBooksParams = {
  quertConfig?: InfiniteQueryConfig<typeof getInfiniteBoooksQueryOption>;
  param: BookListQueryProps;
};

export const bookStorageKey = () => 'book';
export const bookQueryKey = (param: BookListQueryProps) => ['book', param];
