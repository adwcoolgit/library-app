import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/types/user.type';
import { setIsLogin, setUser } from '@/features/auth/authSlice';
import { getItemWithExpiry, removeItem } from './storages';
import {
  loginTokenStorageKey,
  loginUserStorageKey,
} from '@/services/login.service';
import { getUserQueryKey } from '@/services/hooks/useUser';

export const InitAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    // removeItem('token');
    // removeItem('user');
    // dispatch(setIsLogin(false));

    const user = getItemWithExpiry(loginUserStorageKey());
    const token = getItemWithExpiry(loginTokenStorageKey());

    if (token && user) {
      const parsedUser: User = JSON.parse(user);
      // Set Redux & cache
      dispatch(setUser(parsedUser));
      dispatch(setIsLogin(true));
      queryClient.setQueryData<User>(getUserQueryKey, parsedUser);
    } else {
      removeItem(loginTokenStorageKey());
      removeItem(loginUserStorageKey());
      dispatch(setIsLogin(false));
    }
  }, [dispatch, queryClient]);

  return null;
};
