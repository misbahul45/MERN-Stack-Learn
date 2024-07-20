import { createFileRoute, Navigate } from '@tanstack/react-router'
import SignIn from '../../pages/auth/SignIn'
import { useContext } from 'react'
import { AuthContext } from '../../components/Layout/AuthContextProvider'


export const Route = createFileRoute('/_auth/sign-in')({
  component:SignInPages,
})


function SignInPages(){
  const {isAuthenticated}=useContext(AuthContext)
  if(isAuthenticated){
    return <Navigate to={'/'} />
  }
  return(
    <SignIn />
  )
}