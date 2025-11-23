import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

interface SearchBoxProps {
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ className }) => {
  return (
    <div className={cn('relative hidden w-auto md:block', className)}>
      <Input
        placeholder='Search book'
        variant={'search'}
        className={cn('relative hidden w-auto md:block', className)}
      />
      <Button
        variant={'borderless'}
        size={'icon-sm'}
        className='absolute top-1/2 left-0.5 flex size-fit h-full -translate-y-1/2 rounded-none border-0 p-2'
      >
        <Search size={18} className='text-neutral-500' />
      </Button>
    </div>
  );
};
