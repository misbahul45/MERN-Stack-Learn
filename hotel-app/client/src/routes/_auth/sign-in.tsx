import { createFileRoute, redirect } from '@tanstack/react-router'
import SignIn from '../../pages/auth/SignIn'


export const Route = createFileRoute('/_auth/sign-in')({
  component:SignInPages,
  beforeLoad:({ context:{ authenticated } }) => {
    const { user } = authenticated
    if(user){
     return redirect({
       to: '/'
     })
    }
  }
})


function SignInPages(){
  return(
    <SignIn />
  )
}