import React from 'react'

interface FormProps {
    children:React.ReactNode,
    [key:string]:unknown
}
const Form = ({children, ...props}:FormProps) => {
  return (
    <form {...props}>
      {children}
    </form>
  )
}

export default Form
