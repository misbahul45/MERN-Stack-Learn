import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: () => <div>Hello /profile!</div>,
  beforeLoad:({ context:{ authenticated: {user}  } }) => {
    if(!user){
      return redirect({
        to: '/sign-in'
      })
    }
  }
})