import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { useAuth } from "./assets/hooks/useAuth"

// Create a new router instance
const routerApp = createRouter({
  routeTree,
  context:{
    auth:{
      login:false
    }
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof routerApp
  }
}
const App = () => {
  const { login:auth }=useAuth()
  return (
      <RouterProvider router={routerApp} context={{ auth:{
        login:auth
      } }} />
  )
}

export default App
