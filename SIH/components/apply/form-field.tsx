import * as React from 'react';
import { clsx } from 'clsx';
import { FormError } from './form-error';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  helpText,
  error,
  required,
  children,
  className,
  ...props
}: FormFieldProps) {
  const describedBy = [helpText ? `${id}-help` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={clsx('space-y-1.5', className)} {...props}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-error" aria-hidden="true">*</span> : null}
        <span className="sr-only">{required ? ' required' : ' optional'}</span>
      </label>
      {helpText ? (
        <p id={`${id}-help`} className="text-sm leading-6 text-muted-foreground">
          {helpText}
        </p>
      ) : null}
      <div aria-describedby={describedBy}>{children}</div>
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}
