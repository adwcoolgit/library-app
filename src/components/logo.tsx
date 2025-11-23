import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';
import imgLogo from '../../public/images/logo.svg';
import Image from 'next/image';

export const Logo: React.FC<ComponentProps> = ({ className }) => {
  return (
    <div
      className={cn('flex w-fit flex-row items-center gap-x-3.75', className)}
    >
      <div className='relative size-10 md:size-10.5'>
        <Image
          fill
          alt='logo'
          src={imgLogo}
          className='absolute object-contain'
        />
      </div>
      <p className='text-display-md leading-md hidden font-extrabold md:block'>
        Booky
      </p>
    </div>
  );
};
