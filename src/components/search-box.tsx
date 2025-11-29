import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { BookListQueryProps } from '@/services/book-list.service';
import { updateBooks } from '@/features/booksSlice';

interface SearchBoxProps {
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ className }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleDebouncedChange = debounce((value: string) => {
    setSearchValue(value);
  }, 50);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDebouncedChange(e.target.value);
  };

  return (
    <div
      className={cn('relative hidden w-auto md:block', className)}
      onClick={() => {
        const params: BookListQueryProps = {};
        params.q = searchValue;
        dispatch(updateBooks(params));
      }}
    >
      <Input
        placeholder='Search book'
        variant={'search'}
        value={searchValue}
        className={cn('relative hidden w-auto md:block', className)}
        onChange={onChange}
      />
      <Button
        variant={'borderless'}
        size={'icon-sm'}
        className='absolute top-1/2 left-0.5 z-50 flex size-fit h-full -translate-y-1/2 rounded-none border-0 p-2'
      >
        <Search size={18} className='text-neutral-500' />
      </Button>
    </div>
  );
};
