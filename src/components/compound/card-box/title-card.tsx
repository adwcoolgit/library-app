import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';

export const TitleCard: React.FC<ComponentProps> = ({ className }) => {
  return <div className={cn('', className)}></div>;
};
