import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode | string;
  [key: string]: unknown;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{
        scale: [0.95, 1.05, 1],
      }}
      whileHover={{
        opacity: 0.8,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export default Button;
