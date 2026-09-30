import * as React from 'react';
import { clsx } from 'clsx';

export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function FormError({ message, className, ...props }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={clsx('mt-1 text-sm leading-6 text-error', className)}
      role="alert"
      {...props}
    >
      {message}
    </p>
  );
}
