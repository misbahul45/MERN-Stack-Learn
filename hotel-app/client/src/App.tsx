
import useAuth from './hooks/useAuth'
import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'

const router=createRouter({
  routeTree,
  context:{
    authenticated:{
      user:undefined
    }
  },
 })

declare module '@tanstack/react-router' {
  interface Register{
    router:typeof router,
    context:MyRouterContext
  }
}

const App = () => {
  const { user }=useAuth()
  return (
    <RouterProvider router={router} context={{authenticated:{user}}} />
  )
}

export default App
