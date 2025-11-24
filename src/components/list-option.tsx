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
    <div className={cn('flex w-auto justify-end border-0', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className='hover:text-primary h-5 cursor-pointer justify-end sm:w-auto'
        >
          <div className='flex items-center gap-x-1'>{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mt-2 w-auto rounded-sm border bg-white p-1.5'>
          <DropdownMenuRadioGroup
            value={utilityOption}
            onValueChange={setUtilityOption}
            className='w-auto rounded-md border-0 bg-white'
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
