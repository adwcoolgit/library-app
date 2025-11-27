'use client';

import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { type User as UserType } from '@/types/user.type';
import { AuthContext, AuthDialog } from '@/contexts/auth.context';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/library';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { SearchBox } from '@/components/search-box';
import { ListOption } from '@/components/list-option';

interface StateProps {
  search: boolean;
  menu: boolean;
}

const defaultState: StateProps = {
  search: false,
  menu: false,
};

export const UtilityBar: React.FC<ComponentProps> = ({ className }) => {
  const { setDialog } = useContext(AuthContext);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const currentUser: UserType | null = isLogin ? reduxUser || null : null;
  const [hideUtility, setHideUtility] = useState<StateProps>(defaultState);

  const btnSearch_Click = (state: boolean) => {
    setHideUtility((prev) => ({
      ...prev,
      search: state,
    }));
  };

  const btnAuth_Click = (state: AuthDialog) => {
    setDialog(state);
  };

  const btnMenu_Click = (state: boolean) => {
    setHideUtility((prev) => ({
      ...prev,
      menu: state,
    }));
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
            btnMenu={btnMenu_Click}
            hideUtility={hideUtility}
            className='md:hidden'
          />

          {!hideUtility.search && (
            <ListOption className='flex-center bg-background flex size-10 cursor-pointer overflow-hidden rounded-full border md:size-12'>
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
            </ListOption>
          )}
          <div className='leading-lg hidden cursor-pointer items-center text-center text-lg font-semibold md:flex'>
            <ListOption>
              {currentUser.name}
              <ChevronDown className='hidden cursor-pointer text-black md:block' />
            </ListOption>
          </div>
        </div>
      ) : (
        <div className='relative mx-0 flex w-full justify-end'>
          {/* Login & Register button */}
          <AuthButton
            className={`md:mt-none bg-background absolute mt-10 w-auto md:relative`}
            btnLogin={btnAuth_Click}
            hideUtility={hideUtility}
          />
          <CartBadge
            btnSearch={btnSearch_Click}
            btnMenu={btnMenu_Click}
            hideUtility={hideUtility}
            className='md:hidden'
          />
        </div>
      )}
    </>
  );
};

interface FunctionProps extends ComponentProps {
  hideUtility: StateProps;
  btnSearch?: (state: boolean) => void;
  btnMenu?: (state: boolean) => void;
  btnLogin?: (state: AuthDialog) => void;
}

const CartBadge: React.FC<FunctionProps> = ({
  className,
  hideUtility,
  btnSearch = (_value) => {},
  btnMenu = (_value) => {},
}) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <div
      className={cn(
        'container flex h-fit w-auto grow items-center justify-end gap-x-6 md:w-fit',
        className
      )}
    >
      {hideUtility.search || hideUtility.menu ? (
        <div className='ml-4 flex w-full items-center gap-x-4'>
          {hideUtility.search && (
            <>
              <SearchBox className='left-0 flex h-10 w-full' />
              <X onClick={() => btnSearch(!hideUtility.search)} />
            </>
          )}
          {hideUtility.menu && (
            <div className='flex h-6 w-full justify-end gap-x-4'>
              <Search
                className='block size-6 w-fit md:hidden'
                onClick={() => {
                  btnSearch(!hideUtility.search);
                  btnMenu(!hideUtility.menu);
                }}
              />
              <X
                className='block size-6 w-fit'
                onClick={() => btnMenu(!hideUtility.menu)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className='flex gap-x-4 md:gap-x-6'>
          <div>
            <Search
              className='block size-6 w-full md:hidden'
              onClick={() => btnSearch(!hideUtility.search)}
            />
          </div>
          {hideUtility.search && <CartUtility />}
          {!isLogin && (
            <Menu
              onClick={() => btnMenu(!hideUtility.menu)}
              className='block size-6 md:hidden'
            />
          )}
        </div>
      )}
    </div>
  );
};

const AuthButton: React.FC<FunctionProps> = ({
  className,
  hideUtility,
  btnLogin = (_value) => {},
}) => {
  const cmdAuth_Click = () => {
    hideUtility.menu = false;
  };

  return (
    <div
      className={cn(
        `${hideUtility.menu ? 'flex' : 'hidden'} md:p-none gap-x-3 p-4 md:flex md:gap-x-4`,
        className
      )}
    >
      <Button
        onClick={() => {
          btnLogin('LOG_IN');
          cmdAuth_Click();
        }}
        variant='outline'
        size={'md'}
        className='h-10 w-40.75'
        id='login'
      >
        Login
      </Button>
      <Button
        onClick={() => {
          btnLogin('REGISTER');
          cmdAuth_Click();
        }}
        variant='default'
        size={'md'}
        className='h-10 w-40.75'
        id='register'
      >
        Register
      </Button>
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
