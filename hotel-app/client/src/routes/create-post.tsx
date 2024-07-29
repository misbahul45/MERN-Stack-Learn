import { createFileRoute, Navigate} from '@tanstack/react-router'
import CreatePost from '../pages/create-post/CreatePost'

export const Route = createFileRoute('/create-post')({
  component: CreatePostPage,
})



function CreatePostPage() {
  const { authenticated:{ user } }=Route.useRouteContext()
  if(!user?.isAgen){
    return <Navigate to='/' />
  }
  return (
    <section className='w-full'>
      <CreatePost userId={user?.id || ''} />
    </section>
  )
}