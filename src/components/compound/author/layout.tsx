import { ComponentProps } from '@/global-type/component-type';
import { ListCard } from '../card-box';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import imgFinance from '../../../../public/images/Fiction.png';
import { useDispatch } from 'react-redux';
import { authorId, categoryId } from '@/features/ui/uiSlice';
import { Spinner } from '../spinner';
import { useAuthor } from '@/services/hooks/useAuthor';
import { Book, BookA } from 'lucide-react';
import { Icon } from '@iconify/react';

export const AuthorCard: React.FC<ComponentProps> = ({ className }) => {
  const author = useParams();
  const dispatch = useDispatch();
  const { data: authors, isLoading } = useAuthor({
    queryConfig: {
      enabled: !!author,
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
        'grid w-full cursor-pointer grid-cols-1 justify-start gap-x-3 gap-y-3 drop-shadow-xl/5 md:grid-cols-2 md:gap-x-4 md:gap-y-4 lg:grid-cols-4',
        className
      )}
    >
      <ListCard.Box
        className='flex h-full w-full gap-y-3 rounded-xl border bg-white p-3'
        key={0}
        oriantation={'landscape'}
        onClick={() => dispatch(authorId(null))}
      >
        <div className='flex h-20.25 items-center gap-x-3 md:gap-x-4'>
          <ListCard.Img
            alt={''}
            src={imgFinance.src}
            className='bg-category-card my-auto flex size-15 items-center rounded-full md:size-20.25'
          />
          <div className='flex-col justify-center gap-y-0.5'>
            <p className='leading-sm md:leading-lg flex w-full justify-self-start text-sm font-bold md:text-lg'>
              All Author
            </p>
            <div className='flex'>
              <div className=''></div>
              <div className='text-md leading-md font-medium'></div>
            </div>
          </div>
        </div>
      </ListCard.Box>
      {authors?.authors.map((author, i) => (
        <ListCard.Box
          className='bg-card flex h-full w-full gap-y-3 rounded-xl border p-3'
          key={i}
          oriantation={'landscape'}
          onClick={() => dispatch(authorId(author.id))}
        >
          <div className='flex h-20.25 items-center gap-x-3 md:gap-x-4'>
            <ListCard.Img
              alt={author.name}
              src={imgFinance.src}
              className='bg-category-card my-auto flex size-15 items-center rounded-full border md:size-20.25'
            />
            <div className='flex-col justify-center gap-y-0.5'>
              <p className='leading-sm md:leading-lg flex w-full justify-self-start text-sm font-bold md:text-lg'>
                {author.name}
              </p>
              <div className='flex h-full items-center py-0.75'>
                <Icon
                  icon='material-symbols:book'
                  width='24'
                  height='24'
                  className='material-symbols--book'
                />
                <div className='text-md leading-md flex h-8 items-center font-medium'>
                  5 Book
                </div>
              </div>
            </div>
          </div>
        </ListCard.Box>
      ))}
      {/* {authors?.authors.map((author, i) => (
        <div className='relative justify-start border' key={i}>
          <ListCard.Box
            className='bg-card flex-center left-0 flex h-full w-full gap-y-3 rounded-xl border p-3'
            oriantation={'landscape'}
            onClick={() => dispatch(authorId(author.id))}
          >
            <ListCard.Img
              alt={author.name}
              src={imgFinance.src}
              className='bg-category-card size-20.25 justify-self-start rounded-full border'
            />
            <div className='flex-col gap-y-0.5'>
              <p className='leading-sm md:leading-lg w-full justify-self-start text-sm font-bold md:text-lg'>
                {author.name}
              </p>
              <div className='flex'>
                <div className=''></div>
                <div className='text-md leading-md font-medium'>4 Books</div>
              </div>
            </div>
          </ListCard.Box>
        </div>
      ))} */}
    </ListCard.Container>
  );
};
