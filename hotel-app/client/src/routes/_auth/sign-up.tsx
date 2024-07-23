import { createFileRoute, Navigate} from '@tanstack/react-router'
import SignUp from '../../pages/auth/SignUp'

export const Route = createFileRoute('/_auth/sign-up')({
  component:SignUpPages,
})


function SignUpPages(){
  const {authenticated:{ user } } =Route.useRouteContext()
  if(user?.id){
    return <Navigate to={'/'} />
  }
  return(
    <section className='w-full'>
       <SignUp />
    </section>
  )
}