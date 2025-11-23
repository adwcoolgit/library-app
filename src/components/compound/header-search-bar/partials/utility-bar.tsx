'use client';

import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { type User as UserType } from '@/types/user.type';
import { AuthContext } from '@/contexts/auth.context';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/library';
import { useQueryClient } from '@tanstack/react-query';
import { getUserQueryKey } from '@/services/hooks/useUser';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { SearchBox } from '@/components/search-box';

export const UtilityBar: React.FC<ComponentProps> = ({ className }) => {
  const { setDialog } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const currentUser: UserType | null = isLogin
    ? reduxUser || queryClient.getQueryData<UserType>(getUserQueryKey) || null
    : null;
  const [hideUtility, setHideUtility] = useState<boolean>(false);

  const btnSearch_Click = () => {
    setHideUtility(!hideUtility);
  };

  const btnHideSearch_Click = () => {
    setHideUtility(!hideUtility);
  };

  const btnLogin_Click = () => {
    setDialog('LOG_IN');
  };

  const btnRegister_Click = () => {
    setDialog('REGISTER');
  };

  return (
    <>
      {currentUser ? (
        <div
          className={cn(
            'relative flex w-full items-center justify-end gap-x-6 md:w-auto',
            className
          )}
        >
          <CartUtility className='hidden md:flex' />

          <CartBadge
            btnSearch={btnSearch_Click}
            btnHideSearch={btnHideSearch_Click}
            hideUtility={hideUtility}
            className='md:hidden'
          />

          {!hideUtility && (
            <div className='flex-center bg-background flex size-10 cursor-pointer overflow-hidden rounded-full border md:size-12'>
              {currentUser.avatarUrl?.src ? (
                <Image
                  src={currentUser.avatarUrl}
                  alt='user account'
                  fill
                  className='absolute object-contain'
                />
              ) : (
                <Icon
                  icon='gridicons:user'
                  className='flex size-7 md:size-10'
                />
              )}
            </div>
          )}
          <p className='leading-lg hidden cursor-pointer items-center text-center text-lg font-semibold md:block'>
            {currentUser.name}
          </p>
          <ChevronDown className='hidden cursor-pointer text-black md:block' />
        </div>
      ) : (
        <div className='mx-0 flex w-full justify-end'>
          <div className='hidden gap-x-4 md:flex'>
            <Button
              onClick={btnLogin_Click}
              variant='outline'
              size={'md'}
              className='w-40.75'
              id='login'
            >
              Login
            </Button>
            <Button
              onClick={btnRegister_Click}
              variant='default'
              size={'md'}
              className='w-40.75'
              id='register'
            >
              Register
            </Button>
          </div>
          <CartBadge
            btnSearch={btnSearch_Click}
            btnHideSearch={btnHideSearch_Click}
            hideUtility={hideUtility}
            className='md:hidden'
          />
        </div>
      )}
    </>
  );
};

interface FunctionProps extends ComponentProps {
  hideUtility: boolean;
  btnSearch: () => void;
  btnHideSearch: () => void;
}

const CartBadge: React.FC<FunctionProps> = ({
  className,
  hideUtility,
  btnSearch,
  btnHideSearch,
}) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <div
      className={cn(
        'container flex h-fit w-auto grow items-center justify-end gap-x-6 md:w-fit',
        className
      )}
    >
      {hideUtility ? (
        <div className='ml-4 flex w-full items-center gap-x-4'>
          <SearchBox className='left-0 flex h-10 w-full' />
          <X onClick={btnHideSearch} />
        </div>
      ) : (
        <div className='flex gap-x-4 md:gap-x-6'>
          <div>
            <Search
              className='block size-6 w-full md:hidden'
              onClick={btnSearch}
            />
          </div>
          <CartUtility />
          {!isLogin && <Menu className='block size-6 md:hidden' />}
        </div>
      )}
    </div>
  );
};

const CartUtility: React.FC<ComponentProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative block size-7 cursor-pointer items-center justify-end md:size-8',
        className
      )}
    >
      <Icon icon='lets-icons:bag-fill' width='32' height='32' />
      <p className='bg-field-warning text-background flex-center absolute top-0 right-0 flex size-5 translate-x-1/4 -translate-y-1/4 rounded-full text-center text-xs font-bold'>
        1
      </p>
    </div>
  );
};
