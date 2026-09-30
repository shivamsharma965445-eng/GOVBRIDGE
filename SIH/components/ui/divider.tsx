import { clsx } from 'clsx';
import * as React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {}

export function Divider({ className, ...props }: DividerProps) {
  return <hr className={clsx('border-t border-border', className)} {...props} />;
}
