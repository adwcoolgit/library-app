import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex text-black border placeholder:text-muted-foreground w-auto rounded-xl font-semibold outline-none py-2 items-center text-sm leading-md focus:placeholder-transparent',
  {
    variants: {
      variant: {
        default: 'h-12 px-4',
        outline: 'h-11 px-4',
        search: 'rounded-full w-125 border-neutral-300 h-11 pl-9 pr-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Input({
  className,
  variant,
  ...props
}: React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  }) {
  return (
    <input
      data-slot='input'
      className={cn(inputVariants({ variant, className, ...props }))}
      {...props}
    />
  );
}

export { Input, inputVariants };

// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Input }
