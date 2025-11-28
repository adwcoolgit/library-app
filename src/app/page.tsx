'use client';

import { UIHeaderSearchBar } from '@/components/compound/header-search-bar/partials';
import { UIAuthLogin } from '@/components/compound/login/layout';
import { UIRegisterDialog } from '@/components/compound/register/layout';
import { AuthContext } from '@/contexts/auth.context';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './library';
import { Wrapper } from '@/components/wrapper';
import { Carousel } from '@/components/carousel';
import { CategoriesCard } from '@/components/compound/categories/layout';
import { BooksCard } from '@/components/compound/books/layout';
import { AuthorCard } from '@/components/compound/author/layout';
import { Logo } from '@/components/logo';

export default function Home() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const { dialog } = useContext(AuthContext);

  return (
    <>
      <div className='sticky z-50 flex py-3 md:py-4.5'>
        <UIHeaderSearchBar.Wrapper className='flex-between'>
          <UIHeaderSearchBar.Logo className='' />
          {isLogin && <UIHeaderSearchBar.Search className='w-125' />}
          <UIHeaderSearchBar.Content />
        </UIHeaderSearchBar.Wrapper>
      </div>
      {dialog === 'LOG_IN' ? (
        <UIAuthLogin className='' />
      ) : dialog === 'REGISTER' ? (
        <UIRegisterDialog />
      ) : (
        <></>
      )}

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
      <Wrapper className='py-20'>
        <div className='flex w-full flex-col justify-center gap-y-10'>
          <div className='mx-auto flex w-full flex-col gap-y-5.5'>
            <Logo className='mx-auto flex' />
            <p className='text-md leading-md mx-auto flex justify-center text-center font-semibold'>
              Discover inspiring stories & timeless knowledge, ready to borrow
              anytime. Explore online or visit our nearest library branch.
            </p>
          </div>
          <div className='flex flex-col gap-y-5'>
            <p className='text-md leading-md flex items-center justify-center font-bold'>
              Follow on Social Media
            </p>
            <div className='mx-auto flex w-fit justify-center gap-x-3'>
              <div className='size-10 rounded-full border border-neutral-200'></div>
              <div className='size-10 rounded-full border border-neutral-200'></div>
              <div className='size-10 rounded-full border border-neutral-200'></div>
              <div className='size-10 rounded-full border border-neutral-200'></div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
