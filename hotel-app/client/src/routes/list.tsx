import { createFileRoute } from '@tanstack/react-router'
import { SearchQuerySchema } from '../schema/search.zod'
import ListPage from '../pages/List/ListPage'

export const Route = createFileRoute('/list')({
  component: ListPageComponent,
  validateSearch: (search)=>{
    return SearchQuerySchema.parse(search)
  },

})


function  ListPageComponent() {
  const { city, minPrice, maxPrice, type, property }=Route.useSearch()
  return(
    <section className='w-full flex justify-center px-4'>
      <ListPage city={city} property={property} minPrice={minPrice} maxPrice={maxPrice} type={type} />
    </section>
  )
}