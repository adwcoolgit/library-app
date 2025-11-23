import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type UIHeaderTitleProps = {
  children: ReactNode;
  className?: string;
};

export const UIContent: React.FC<UIHeaderTitleProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline custom-container w-full mx-auto items-center font-medium text-sm leading-6 text-gray-600 border-0',
        className
      )}
    >
      {children}
    </div>
  );
};
