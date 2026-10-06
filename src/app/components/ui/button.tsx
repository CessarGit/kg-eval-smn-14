'use client';

import { cn } from '@/src/app/libs/utils';

// Cambiar 'interface' vacía por 'type'
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn('rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700', className)}
      {...props}
    >
      {children}
    </button>
  );
}