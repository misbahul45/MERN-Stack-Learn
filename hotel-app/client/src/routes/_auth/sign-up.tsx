import { createFileRoute, redirect } from '@tanstack/react-router'
import SignUp from '../../pages/auth/SignUp'

export const Route = createFileRoute('/_auth/sign-up')({
  component:SignUpPages,
  beforeLoad:({ context:{ authenticated } }) => {
    const { user } = authenticated
    if(user){
     return redirect({
       to: '/'
     })
    }
  }
})


function SignUpPages(){
  return(
    <SignUp />
  )
}