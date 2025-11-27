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
import { ListCard } from '@/components/compound/card-box';
import { CategoriesCard } from '@/components/compound/categories/layout';
import { BooksCard } from '@/components/compound/books/layout';

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

      <Wrapper className='mt-4 flex-col gap-y-4 md:mt-12 md:gap-y-12'>
        <Carousel className='' />
        <CategoriesCard className='' />
        <BooksCard />
      </Wrapper>
    </>
  );
}
