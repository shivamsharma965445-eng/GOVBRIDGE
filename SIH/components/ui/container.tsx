import { clsx } from 'clsx';
import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return <div className={clsx('mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8', className)} {...props} />;
}
