import { useQuery } from '@tanstack/react-query';
import { authorQueryOption, UseAuthorParam } from '../author.service';

export const useAuthor = (params: UseAuthorParam = {}) => {
  return useQuery({
    ...authorQueryOption(),
    ...params.queryConfig,
  });
};
