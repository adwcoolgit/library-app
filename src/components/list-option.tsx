'use client';

import { UtilityData } from '@/constant/utility-data';
import { logout, setIsLogin, setUser } from '@/features/auth/authSlice';
import { cn } from '@/lib/utils';
import { getUserQueryKey } from '@/services/hooks/useUser';
import {
  loginTokenStorageKey,
  loginUserStorageKey,
} from '@/services/login.service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';

type UtilityOptionProps = {
  children: ReactNode;
  className?: string;
};

export const ListOption: React.FC<UtilityOptionProps> = ({
  children,
  className,
}) => {
  const [utilityOption, setUtilityOption] = useState('');
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const Logout = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    const userKey = loginUserStorageKey();
    localStorage.removeItem(userKey);
    const tokenKey = loginTokenStorageKey();
    localStorage.removeItem(tokenKey);
    dispatch(logout());
  };

  const btnUtility_Click = (title: string) => {
    switch (title) {
      case 'Profile':
        return;
      case 'Borrowed List':
        return;
      case 'Reviews':
        return;
      case 'Logout':
        Logout();
        return;
    }
  };

  return (
    <div
      className={cn(
        'flex w-full justify-center border md:w-auto md:justify-end',
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className='hover:text-primary h-5 cursor-pointer sm:w-auto md:justify-end'
        >
          <div className='flex items-center gap-x-1'>{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-background mt-5 flex w-98.25 rounded-sm border p-1.5 md:w-auto'>
          <DropdownMenuRadioGroup
            value={utilityOption}
            onValueChange={setUtilityOption}
            className='flex w-full flex-col gap-y-4 rounded-md bg-white md:w-auto'
          >
            {UtilityData.map((option, index) => (
              <DropdownMenuRadioItem
                key={option.menuTile}
                value={option.menuTile?.toString()}
                className='focus:bg-secondary text-md leading-md w-auto cursor-pointer rounded-xs border-0 px-3 py-1.5 font-semibold focus:outline-none'
                onClick={() => btnUtility_Click(option.menuTile)}
              >
                <span
                  className={`flex justify-start text-sm leading-6 text-black md:w-46 ${index == UtilityData.length - 1 && 'text-field-warning'}`}
                >
                  {option.menuTile}
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
