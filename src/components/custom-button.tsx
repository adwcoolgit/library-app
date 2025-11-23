import { cn } from '@/lib/utils';
import React, { ComponentProps, ReactNode } from 'react';
import { Button } from './ui/button';

interface UIButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  className?: string;
  variant: 'default' | 'outline' | 'borderless';
}

export const UIButton: React.FC<UIButtonProps> = ({
  children,
  className,
  variant = 'default',
  onClick = () => {},
}) => {
  return (
    <Button variant={variant} className={cn('', className)} onClick={onClick}>
      {children}
    </Button>
  );
};
