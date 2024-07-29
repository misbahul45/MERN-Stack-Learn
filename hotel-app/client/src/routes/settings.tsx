import { createFileRoute, redirect } from '@tanstack/react-router'
import Settings from '../pages/setting/Settings'

export const Route = createFileRoute('/settings')({
  component:SettingsPages,
  beforeLoad:({ context:{ authenticated: {user}  } }) => {
    if(!user){
      return redirect({
        to: '/sign-in'
      })
    }
  }
})


function SettingsPages(){
  return(
    <section className='w-full max-w-lg'>
       <Settings />
    </section>
  )
}