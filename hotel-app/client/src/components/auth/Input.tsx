import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  name: string;
  type:'text' | 'password' | 'number' | 'email';
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, name, type, placeholder, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
});

export default Input;
