import { createFileRoute, Navigate } from '@tanstack/react-router'
import SignIn from '../../pages/auth/SignIn'

export const Route = createFileRoute('/_auth/sign-in')({
  component:SignInPage,
})

function SignInPage() {
  const {authenticated:{ user } } =Route.useRouteContext()
  if(user?.id){
    return <Navigate to={'/'} />
  }
  return (
    <section className='w-full'>
      <SignIn />
    </section>
    )
}