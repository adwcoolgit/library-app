'use client';

import { RootState } from '@/app/store';
import { AuthContext } from '@/contexts/auth.context';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { UIHeaderSearchBar } from './compound/header-search-bar/partials';
import { UIAuthLogin } from './compound/login/layout';
import { UIRegisterDialog } from './compound/register/layout';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';

export function Header() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const { dialog } = useContext(AuthContext);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // useEffect(() => {
  //   const unsub = scrollY.on('change', (latest) => console.log(latest));

  //   () => unsub();
  // }, [scrollY]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous: number | undefined = scrollY.getPrevious();

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: '-200%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className='bg-background/50 sticky top-0 z-50 flex py-3 backdrop-blur-md md:py-4.5'>
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
    </motion.div>
  );
}
