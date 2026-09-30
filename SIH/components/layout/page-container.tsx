import { clsx } from 'clsx';
import * as React from 'react';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageContainer({ className, ...props }: PageContainerProps) {
  return <div className={clsx('mx-auto w-full max-w-container px-4 pb-12 pt-6 sm:px-6 lg:px-8', className)} {...props} />;
}
