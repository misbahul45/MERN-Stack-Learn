import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$id')({
  component:Post,
  loader:async({ params }) => {
    const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    return await res.json()
  }
})


function Post(){
  const post=Route.useLoaderData()
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to='/'>Home</Link>
    </main>
  )
}