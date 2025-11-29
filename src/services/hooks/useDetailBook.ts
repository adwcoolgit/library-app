import { useQuery } from '@tanstack/react-query';
import { boookQueryOption, UseBookParams } from '../book-detail.service';

export function useBook(bookId: number | null) {
  return useQuery({
    ...boookQueryOption(bookId),
  });
}
