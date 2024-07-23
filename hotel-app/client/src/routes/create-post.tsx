import { createFileRoute, redirect} from '@tanstack/react-router'
import CreatePost from '../pages/create-post/CreatePost'

export const Route = createFileRoute('/create-post')({
  component: CreatePostPage,
  beforeLoad:({ context:{ authenticated: {user}  } }) => {
    if(!user){
      return redirect({
        to: '/sign-in'
      })
    }
  }
})



function CreatePostPage() {
  const { authenticated:{ user } }=Route.useRouteContext()
  return (
    <section className='w-full'>
      <CreatePost userId={user?.id || ''} />
    </section>
  )
}