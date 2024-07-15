import { createFileRoute} from '@tanstack/react-router'
import { z } from 'zod'

const SearchPostsSchema=z.object({
  title:z.string(),
  author:z.string()
})

type SearchPosts=z.infer<typeof SearchPostsSchema>
export const Route = createFileRoute('/search')({
  validateSearch:(search)=>SearchPostsSchema.parse(search),
  component:SearchPosts,
})

function SearchPosts(){
  const { title, author }=Route.useSearch()
  return (
    <section>
      {JSON.stringify({title, author})}
    </section>
  )
}