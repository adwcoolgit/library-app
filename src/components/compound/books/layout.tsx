import { ComponentProps } from '@/global-type/component-type';
import { ListCard } from '../card-box';
import { useInfiniteBooks } from '@/services/hooks/useBooks';
import { BookListQueryProps } from '@/services/book-list.service';
import { Spinner } from '../spinner';
import { ArchiveX, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { cn, safeImageSrc } from '@/lib/utils';

interface FilterProps {
  ratings?: number[] | undefined;
}
export const BooksCard: React.FC<ComponentProps & FilterProps> = ({
  className,
  ratings = [],
}) => {
  const categoryId = useSelector((state: RootState) => state.books.categoryId);
  const booksTitle = useSelector((state: RootState) => state.books.q);
  const authorId = useSelector((state: RootState) => state.books.authorId);
  const params: BookListQueryProps = {};
  params.categoryId = categoryId;
  params.q = booksTitle;
  params.authorId = authorId;
  const {
    data: booksData,
    isLoading: loadingBooks,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteBooks(params);

  if (loadingBooks) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const books = booksData?.pages.flatMap((page) => page.books);

  if (!books?.length) {
    return (
      <div
        className='bg-background flex h-10 flex-col items-center justify-center text-neutral-400'
        role='list'
        aria-label='books'
      >
        <ArchiveX className='size-10' />
        <h4>No Books Found</h4>
      </div>
    );
  }

  const filteredBooks = books.filter((book) => {
    const ratingMatch =
      ratings.length === 0 ||
      ratings.some((r) => book.rating >= r && book.rating < r + 1);

    return ratingMatch;
  });

  return (
    <div className='flex flex-col gap-y-10'>
      <ListCard.Container
        className={cn(
          'grid grid-cols-2 flex-wrap gap-y-4 md:grid-cols-3 md:gap-y-5 lg:grid-cols-5',
          className
        )}
      >
        {filteredBooks.map((book, index) => (
          <ListCard.Box
            className='h-fit w-full flex-1/4 cursor-pointer overflow-hidden border bg-white drop-shadow-xl/5'
            key={book.id || index}
            oriantation={'potrait'}
          >
            <ListCard.Img
              src={
                safeImageSrc(book.coverImage) ??
                '/../../../../public/images/layout.tsx'
              }
              alt={book.title}
              className='mx-0 flex h-fit w-full object-fill'
              style={{
                height: 'clamp(21rem, 17.92vw, 16.13rem)',
              }}
            />
            <div className='flex flex-col gap-y-1 p-3 md:p-4'>
              <p className='leading-lg truncate text-lg font-bold tracking-tight'>
                {book.title}
              </p>
              <p className='text-md leading-md font-medium'>
                {book.Author.name}
              </p>
              <div className='flex items-center justify-start'>
                <div className='p-0.75'>
                  <Star fill='#FFAB0D' stroke='none' />
                </div>
                <p className='text-md leading-md font-semibold'>
                  {book.rating}
                </p>
              </div>
            </div>
          </ListCard.Box>
        ))}
      </ListCard.Container>
      {hasNextPage && (
        <Button
          variant={'outline'}
          className='md:w-50'
          onClick={() => fetchNextPage()}
        >
          <p className='text-md leading-md font-semibold'>Load More</p>
        </Button>
      )}
    </div>
  );
};
