import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/Layout/Navbar'

export const Route =createRootRoute({
  component:()=>{
    return <>
            <Navbar />
            <main className='w-full flex justify-center bg-slate-900 min-h-screen'>
              <Outlet />
            </main>
          </>
  }
})