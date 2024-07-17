import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Navbar from '../components/Layout/Navbar'




export const Route =createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent
})

function RootComponent(){
  return <>
          <Navbar />
          <main className='w-full flex justify-center bg-slate-900 min-h-[calc(100vh-4rem)]'>
            <Outlet />
          </main>
        </>
}