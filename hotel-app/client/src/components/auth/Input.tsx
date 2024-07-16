import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  name: string;
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, name, type = 'text', placeholder, ...rest }, ref) => {
  return (
    <motion.input
      animate={{
        opacity:[0,1,0.95,1],
        scale:[0,1,0.95,1],
        transition: {
          duration: 0.2
        }
      }}
      ref={ref}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      {...rest as MotionProps}
    />
  );
});

export default Input;
