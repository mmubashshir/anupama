import { type JSX, type ReactNode } from 'react';

import { cn } from '~/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Container({
  children,
  className,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto max-w-6xl', className)}>
      {children}
    </Component>
  );
}
