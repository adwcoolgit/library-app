import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';

export const CardContainer: React.FC<ComponentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('grid h-auto w-full gap-x-5', className)}>
      {children}
    </div>
  );
};
