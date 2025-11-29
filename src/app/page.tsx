'use client';

import { Wrapper } from '@/components/wrapper';
import { Carousel } from '@/components/carousel';
import { CategoriesCard } from '@/components/compound/categories/layout';
import { BooksCard } from '@/components/compound/books/layout';
import { AuthorCard } from '@/components/compound/author/layout';
import { Logo } from '@/components/logo';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />

      <Wrapper className='mt-4 flex-col gap-y-4 md:my-12 md:gap-y-12'>
        <Carousel className='' />
        <CategoriesCard className='' />
        <div className='flex w-full flex-col justify-start gap-y-5 md:gap-y-10'>
          <h3 className='text-display-xs md:text-display-lg leading-xs md:leading-xl left-lg w-full justify-self-start font-bold'>
            Recomendation
          </h3>
          <BooksCard />
        </div>
        <hr className='w-full border-t border-neutral-300' />
        <div className='flex w-full flex-col justify-start gap-y-5 md:gap-y-10'>
          <h3 className='text-display-xs md:text-display-lg leading-xs md:leading-xl left-lg mx-0 h-auto w-full justify-self-start font-bold'>
            Popular Author
          </h3>
          <AuthorCard />
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}
