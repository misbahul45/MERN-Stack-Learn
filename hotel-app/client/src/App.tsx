import { useContext } from 'react'
import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { AuthContext } from './components/Layout/AuthContextProvider'

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
  const { user }=useContext(AuthContext)
  return (
        <RouterProvider router={router} context={{authenticated:{ user }}} />
  )
}

export default App
