'use client';

import { RootState } from '@/app/store';
import { BooksCard } from '@/components/compound/books/layout';
import { Spinner } from '@/components/compound/spinner';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Wrapper } from '@/components/wrapper';
import { updateBooks } from '@/features/booksSlice';
import { BookListQueryProps } from '@/services/book-list.service';
import { useInfiniteBooks } from '@/services/hooks/useBooks';
import { useCategories } from '@/services/hooks/useCategory';
import { ChevronDown, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Category() {
  const categoryId = useSelector((state: RootState) => state.books.categoryId);
  const [selectedCategory, setSelectedCategory] = useState<number | null>();
  const { data: categories, isLoading } = useCategories();
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const dispatch = useDispatch();
  const params: BookListQueryProps = {};

  if (isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const toggleRating = (value: number) => {
    setRatingFilter((prev) =>
      prev?.includes(value)
        ? prev.filter((rate) => rate !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <Header />
      <Wrapper className='my-12'>
        <div className='mx-0 flex w-full flex-col gap-y-8'>
          <p className='md::text-8 z-0 mt-0 mb-0 flex w-full justify-self-start border-gray-300 bg-white text-2xl font-bold text-neutral-950 md:sticky lg:top-20 lg:my-0'>
            Book List
          </p>
          <div className='flex flex-row lg:gap-6'>
            <nav className='hidden h-fit w-66.5 flex-col rounded-2xl border border-gray-300 lg:sticky lg:top-32 lg:flex lg:pt-4 lg:pb-4'>
              <div className='flex h-fit w-full flex-col gap-2.5 lg:pr-4 lg:pl-4'>
                <p className='lg:text-md text-sm leading-8 font-bold tracking-wide'>
                  FILTER
                </p>
                <p className='lg:text-md text-md-line-height text-sm font-bold tracking-wide'>
                  Categories
                </p>
                <div className='text-md-line-height flex flex-col gap-y-2.5 overflow-hidden font-bold'>
                  <Label
                    className='text-md leading-md flex h-auto w-83.5 cursor-pointer items-center space-x-2 font-medium'
                    htmlFor={'All'}
                    key={'All'}
                  >
                    <Checkbox
                      className='size-5 rounded-sm'
                      value={0}
                      id={'All'}
                      checked={selectedCategory === 0}
                      onCheckedChange={() => {
                        const params: BookListQueryProps = {};
                        setSelectedCategory(0);
                        params.categoryId = null;
                        dispatch(updateBooks(params));
                      }}
                    />
                    <span className=''>All</span>
                  </Label>
                  {categories?.categories.map((ctg) => (
                    <Label
                      className='text-md leading-md flex h-auto w-83.5 cursor-pointer items-center space-x-2 font-medium'
                      htmlFor={ctg.name}
                      key={ctg.id}
                    >
                      <Checkbox
                        className='size-5 rounded-sm'
                        value={ctg.id}
                        id={ctg.name}
                        checked={selectedCategory === ctg.id}
                        onCheckedChange={() => {
                          setSelectedCategory(ctg.id);
                          params.categoryId = ctg.id;
                          dispatch(updateBooks(params));
                        }}
                      />
                      <span className=''>{ctg.name}</span>
                    </Label>
                  ))}
                </div>
              </div>
              <hr className='mt-6 mb-6 w-full border-x border-gray-300' />
              {/* Rating */}
              <div className='flex h-fit w-full flex-col gap-2.5 lg:pr-4 lg:pl-4'>
                <p className='lg:text-md text-sm leading-8 font-bold tracking-wide'>
                  Rating
                </p>
                <div className='text-md-line-height ml-2 flex flex-col gap-y-2.5 overflow-hidden font-bold'>
                  {Array.from({ length: 5 }, (_, i) => 4 - i).map(
                    (value, index) => (
                      <Label
                        className='text-md leading-md flex h-auto w-83.5 cursor-pointer items-center space-x-2 font-medium'
                        htmlFor={`star${value + 1}`}
                        key={index}
                      >
                        <Checkbox
                          id={`star${value + 1}`}
                          className='size-5 rounded-sm'
                          onCheckedChange={() => toggleRating(value + 1)}
                        />
                        <Star fill='#FFAB0D' stroke='none' />
                        <span className='text-md leading-md h-auto items-center text-center font-normal text-neutral-950'>
                          {value + 1}
                        </span>
                      </Label>
                    )
                  )}
                </div>
              </div>
            </nav>
            {/* List off book */}
            <div className='grow lg:flex lg:w-auto lg:flex-col lg:gap-x-6'>
              <BooksCard
                ratings={ratingFilter}
                className='px-0 lg:grid-cols-4'
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}
