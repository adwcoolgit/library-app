'use client';

import { ComponentProps } from '@/global-type/component-type';
import { Wrapper } from './wrapper';
import { ArchiveX, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import noImg from '../../public/images/No-image-available.svg';
import { useBook } from '@/services/hooks/useDetailBook';
import { Spinner } from './compound/spinner';
import { cn } from '@/lib/utils';
import { useCategories } from '@/services/hooks/useCategory';
import { useAuthor } from '@/services/hooks/useAuthor';
import { useRouter } from 'next/navigation';

interface queryProps {
  id: number;
}

export const DetailBook: React.FC<ComponentProps & queryProps> = ({
  className,
  id,
}) => {
  const { data: book, isLoading, isError } = useBook(id);
  const { data: category } = useCategories();
  const { data: authors } = useAuthor();
  const router = useRouter();

  const selectedCategory = category?.categories?.filter(
    (c) => c.id === book?.Category.id
  );

  const selectedAuthor = authors?.authors.filter(
    (a) => a.id === book?.Author.id
  );

  if (isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!book || isError) {
    return (
      <div
        className='bg-background flex h-10 flex-col items-center justify-center text-neutral-400'
        role='list'
        aria-label='books'
      >
        <ArchiveX className='size-10' />
        <h4>{isError ? 'Something went wrong' : 'No Books Found'}</h4>
      </div>
    );
  }

  return (
    <>
      <Wrapper className='mt-12'>
        <div
          className={cn(
            'flex w-full flex-col justify-start md:gap-x-6',
            className
          )}
        >
          <div className='leading-sm text-primary-500 flex items-center gap-x-1 text-sm font-semibold'>
            <p className='cursor-pointer' onClick={() => router.push('/')}>
              Home
            </p>
            <ChevronRight size={16} className='text-neutral-950' />
            <p
              className='cursor-pointer'
              onClick={() => router.push('/category')}
            >
              Category
            </p>
            <ChevronRight size={16} className='text-neutral-950' />
            <p className='text-neutral-950'>{book.title}</p>
          </div>
          <div className='relative flex h-full w-full p-2 md:gap-x-9'>
            <div
              className='relative flex h-full w-full flex-[2.6] border bg-neutral-300'
              style={{ height: 'clamp(30.13rem, 22.08vw, 19.88rem)' }}
            >
              <Image
                src={book.coverImage ?? noImg.src}
                alt=''
                fill
                className='absolute flex border object-contain'
              />
            </div>
            <div className='relative my-4.5 h-full w-full flex-[7.4] flex-col'>
              <div className='flex flex-col gap-y-5.5'>
                <div className='flex-col'>
                  <div className=''>
                    <p className='leading-sm text-sm font-bold'>
                      {selectedCategory?.map((ctg) => ctg.name)}
                    </p>
                  </div>
                  <div className='text-display-sm leading-display-sm font-bold'>
                    {book.title}
                  </div>
                  <div className='text-md leading-md tracking-display-xl font-semibold'>
                    {selectedAuthor?.map((author) => author.name)}
                  </div>
                  <div className='text-md leading-md tracking-display-xl flex items-center font-semibold'>
                    <div className='flex-center size-6'>
                      <Star fill='#FFAB0D' stroke='none' size={17} />
                    </div>
                    {book.rating}
                  </div>
                </div>

                <div className='flex'>
                  <div className='flex w-25.5 flex-col'>
                    <div className='text-display-xs leading-display-xs font-bold'>
                      320
                    </div>
                    <div className='text-md leading-md font-medium'>Page</div>
                  </div>
                  <div className='flex w-25.5 flex-col'>
                    <div className='text-display-xs leading-display-xs font-bold'>
                      {book.rating}
                    </div>
                    <div className='text-md leading-md font-medium'>Rating</div>
                  </div>
                  <div className='w-x flex h-[90%] border-l'></div>
                  <div className='flex w-25.5 flex-col'>
                    <div className='text-display-xs leading-display-xs font-bold'>
                      {book.reviewCount}
                    </div>
                    <div className='text-md leading-md font-medium'>Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
