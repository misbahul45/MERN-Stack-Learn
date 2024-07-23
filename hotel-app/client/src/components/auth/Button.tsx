import React, { forwardRef } from 'react';

interface ButtonProps {
  children: React.ReactNode | string;
  [key: string]: unknown;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
