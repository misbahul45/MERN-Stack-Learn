import { createFileRoute, } from '@tanstack/react-router'
import SignUp from '../../pages/auth/SignUp'

export const Route = createFileRoute('/_auth/sign-up')({
  component:SignUpPages,
})


function SignUpPages(){
  return(
    <SignUp />
  )
}