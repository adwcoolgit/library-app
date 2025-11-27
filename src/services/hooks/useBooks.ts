import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  BookListQueryProps,
  getInfiniteBoooksQueryOption,
} from '../book-list.service';

export function useInfiniteBooks(param: BookListQueryProps) {
  return useInfiniteQuery({
    ...getInfiniteBoooksQueryOption(param),
  });
}
