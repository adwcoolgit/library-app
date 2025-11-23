import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';

export const Wrapper: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <>
      <div
        className={cn(
          'custom-container flex-center relative h-fit w-full px-4',
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
