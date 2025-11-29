import { ComponentProps } from '@/global-type/component-type';
import { ListCard } from '../card-box';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useCategories } from '@/services/hooks/useCategory';
import imgFinance from '../../../../public/images/Fiction.png';
import { useDispatch } from 'react-redux';
import { updateBooks } from '@/features/booksSlice';
import { Spinner } from '../spinner';
import { BookListQueryProps } from '@/services/book-list.service';

export const CategoriesCard: React.FC<ComponentProps> = ({ className }) => {
  const category = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const params: BookListQueryProps = {};
  const { data: categories, isLoading } = useCategories({
    queryConfig: {
      enabled: !!category,
    },
  });

  if (isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <ListCard.Container
      className={cn(
        'grid cursor-pointer grid-cols-3 gap-x-3 gap-y-3 md:grid-cols-4 md:gap-x-4 md:gap-y-4 lg:grid-cols-6',
        className
      )}
    >
      <ListCard.Box
        className='bg-card flex-center h-full w-full flex-col gap-y-3 rounded-xl border p-3'
        key={0}
        oriantation={'potrait'}
        onClick={() => dispatch(updateBooks(null))}
      >
        <ListCard.Img
          alt={'All Category'}
          src={imgFinance.src}
          className='bg-category-card'
        />
        <p className='md:text-md leading-sm md:leading-md w-full justify-self-start text-sm font-semibold'>
          All Category
        </p>
      </ListCard.Box>
      {categories?.categories.map((category, i) => (
        <ListCard.Box
          className='bg-card flex-center h-full w-full flex-col gap-y-3 rounded-xl border p-3'
          key={i}
          oriantation={'potrait'}
          onClick={() => {
            params.authorId = category.id;
            dispatch(updateBooks(category.id));
          }}
        >
          <ListCard.Img
            alt={category.name}
            src={imgFinance.src}
            className='bg-category-card'
          />
          <p className='md:text-md leading-sm md:leading-md w-full justify-self-start text-sm font-semibold'>
            {category.name}
          </p>
        </ListCard.Box>
      ))}
    </ListCard.Container>
  );
};
