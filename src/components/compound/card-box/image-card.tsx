import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CSSProperties } from 'react';

export const ImageCard: React.FC<
  ComponentProps & { src: string; alt: string; style?: CSSProperties }
> = ({ className, src, alt, style }) => {
  return (
    <div
      className={cn(
        'bg-card relative mx-auto flex size-12.75 w-full items-center justify-center rounded-xl py-1.5',
        className
      )}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className='absolute bg-transparent object-contain'
      />
    </div>
  );
};
