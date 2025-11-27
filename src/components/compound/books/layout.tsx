import { ComponentProps } from '@/global-type/component-type';
import { ListCard } from '../card-box';
import { useInfiniteBooks } from '@/services/hooks/useBooks';
import { BookListQueryProps } from '@/services/book-list.service';
import { usePathname } from 'next/navigation';
import { Spinner } from '../spinner';
import { ArchiveX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/library';

export const BooksCard: React.FC<ComponentProps> = () => {
  const categoryId = useSelector((state: RootState) => state.ui.categoryId);
  const booksTitle = useSelector((state: RootState) => state.ui.booksTitle);
  const params: BookListQueryProps = {};
  params.categoryId = categoryId;
  params.q = booksTitle;
  const booksQuery = useInfiniteBooks(params);
  const pathName = usePathname();

  if (booksQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const books = booksQuery.data?.pages.flatMap((page) => page.books);

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

  return (
    <div className='flex flex-col gap-y-10'>
      <ListCard.Container className='grid grid-cols-2 flex-wrap md:grid-cols-3 md:gap-y-5 lg:grid-cols-5'>
        {books.map((book, index) => (
          <ListCard.Box
            className='h-fit w-full border'
            key={book.id || index}
            oriantation={'potrait'}
          >
            <ListCard.Img
              src={book.coverImage ?? '/public/images/No-image-available.svg'}
              alt={book.title}
              className='mx-0 flex h-fit w-full object-contain'
              style={{
                height: 'clamp(21rem, 17.92vw, 16.13rem)',
              }}
            />
            <div className='flex flex-col gap-y-4 md:p-4'>
              <p className='leading-lg truncate text-lg font-bold tracking-tight'>
                {book.title}
              </p>
              <p className='text-md leading-md font-medium'>
                {book.Author.name}
              </p>
            </div>
          </ListCard.Box>
        ))}
      </ListCard.Container>
      {booksQuery.hasNextPage && (
        <Button
          variant={'outline'}
          className='md:w-50'
          onClick={() => booksQuery.fetchNextPage()}
        >
          <p className='text-md leading-md font-semibold'>Load More</p>
        </Button>
      )}
    </div>
  );
};
