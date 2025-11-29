import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/reactQuery';
import { Book } from '@/types/book-response-type';
import { ApiResponse } from '@/types/response.type';
import { queryOptions } from '@tanstack/react-query';

export async function bookService(bookId: number | null): Promise<Book> {
  const { data } = await axiosInstance.get<ApiResponse<Book>>(
    `/api/books/${bookId}`
  );

  return data.data as Book;
}

export const boookQueryOption = (bookId: number | null) => {
  return queryOptions({
    queryKey: bookQueryKey(bookId),
    queryFn: () => bookService(bookId),
  });
};

export type UseBookParams = {
  quertConfig?: QueryConfig<typeof boookQueryOption>;
  bookId: number | null;
};

export const bookStorageKey = () => 'book';
export const bookQueryKey = (bookId: number | null) => ['book', bookId];
