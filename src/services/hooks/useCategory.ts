import { useQuery } from '@tanstack/react-query';
import { categoriesQueryOption, UseCategoriesParam } from '../category.service';

export const useCategories = (params: UseCategoriesParam = {}) => {
  return useQuery({
    ...categoriesQueryOption(),
    ...params.queryConfig,
  });
};
