import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

const cardVariants = cva('flex rounded-xl w-full', {
  variants: {
    oriantation: {
      landscape: 'flex-row',
      potrait: 'flex-col',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    oriantation: 'landscape',
    size: 'sm',
  },
});

function Card({
  className,
  children,
  oriantation,
  size,
  asChild,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot='div'
      className={cn(cardVariants({ oriantation, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Card, cardVariants };
