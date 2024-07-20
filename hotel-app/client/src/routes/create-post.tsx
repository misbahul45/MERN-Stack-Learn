import { createFileRoute} from '@tanstack/react-router'
import CreatePost from '../pages/create-post/CreatePost'

export const Route = createFileRoute('/create-post')({
  component: CreatePostPage,
})



function CreatePostPage() {
  const { authenticated:{ user } }=Route.useRouteContext()
  return (
    <CreatePost userId={user?.id || ''} />
  )
}