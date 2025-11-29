import { ComponentProps } from '@/global-type/component-type';
import { Wrapper } from './wrapper';
import { Logo } from './logo';

export const Footer: React.FC<ComponentProps> = () => {
  return (
    <>
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
};
