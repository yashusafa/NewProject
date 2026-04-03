import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return <button className={cn('rounded-md px-3 py-2 text-sm font-medium', className)} {...props} />;
}
