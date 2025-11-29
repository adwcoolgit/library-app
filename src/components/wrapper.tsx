import { ComponentProps } from '@/global-type/component-type';
import { cn } from '@/lib/utils';

export const Wrapper: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <>
      <section
        className={cn(
          'custom-container flex-center relative h-fit w-full px-4 md:px-30',
          className
        )}
      >
        {children}
      </section>
    </>
  );
};
