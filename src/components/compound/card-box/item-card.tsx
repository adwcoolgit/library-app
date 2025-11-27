import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';
import { Book } from '@/types/book-response-type';

export const ItemCard: React.FC<ComponentProps & Book> = ({
  className,
  title,
  Author,
  rating,
}) => {
  return (
    <div className={cn('bg-background flex gap-3 rounded-2xl', className)}>
      <div className=''>{title}</div>
      <div className=''>{Author.name}</div>
      <div className=''>{rating}</div>
    </div>
  );
};
