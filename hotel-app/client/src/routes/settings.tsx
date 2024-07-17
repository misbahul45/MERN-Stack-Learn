import { createFileRoute, redirect } from '@tanstack/react-router'
import Settings from '../pages/setting/Settings'

export const Route = createFileRoute('/settings')({
  component:SettingsPages,
 beforeLoad:({ context})=>{
   if(!context.authenticated.user?.id){
     return redirect({ to: '/sign-in' })
   }
 }
})


function SettingsPages(){
  return(
    <Settings />
  )
}