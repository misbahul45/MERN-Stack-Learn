import { createFileRoute } from '@tanstack/react-router'
import SignIn from '../../pages/auth/SignIn'


export const Route = createFileRoute('/_auth/sign-in')({
  component:SignInPages,
})


function SignInPages(){
  return(
    <SignIn />
  )
}