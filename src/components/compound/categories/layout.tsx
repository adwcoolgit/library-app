import { ComponentProps } from '@/global-type/component-type';
import { ListCard } from '../card-box';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useCategories } from '@/services/hooks/useCategory';
import path from 'path';
import { Button } from '@/components/ui/button';
import imgFinance from '../../../../public/images/Fiction.png';
import { useDispatch, useSelector } from 'react-redux';
import { categoryId, QueryFilter } from '@/features/ui/uiSlice';
import { BookListQueryProps } from '@/services/book-list.service';
import { RootState } from '@/app/library';

export const CategoriesCard: React.FC<ComponentProps> = ({ className }) => {
  const category = useParams();
  const dispatch = useDispatch();
  const { data: categories, isLoading } = useCategories({
    queryConfig: {
      enabled: !!category,
    },
  });

  return (
    <ListCard.Container
      className={cn('grid cursor-pointer grid-cols-6', className)}
    >
      {categories?.categories.map((category, i) => (
        <ListCard.Box
          className='bg-card flex-center h-full w-full flex-col gap-y-3 rounded-xl border p-3'
          key={i}
          oriantation={'potrait'}
          onClick={() => dispatch(categoryId(category.id))}
        >
          <ListCard.Img
            alt={category.name}
            src={imgFinance}
            className='bg-category-card'
          />
          <p className='text-md leading-md w-full justify-self-start font-semibold'>
            {category.name}
          </p>
        </ListCard.Box>
      ))}
    </ListCard.Container>
  );
};
