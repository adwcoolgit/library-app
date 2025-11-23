import { Pagination } from './pagination.type';

export type CategoryResponse = {
  category: Array<string>;
  pagination: Pagination;
};
