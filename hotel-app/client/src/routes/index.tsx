import { createFileRoute } from '@tanstack/react-router'
import HomeSearch from '../components/index/HomeSearch'


export const Route = createFileRoute('/')({
  component:()=><IndexPage/>
})


function IndexPage(){
  return (
    <section className='w-full h-full flex justify-center items-center'>
      <div className='w-full max-w-[80%] h-[calc(100vh-4rem)] flex justify-center items-center'>
        <div className='flex-1 flex flex-col gap-8'>
          <h1 className='text-6xl font-bold'><span className='bg-clip-text bg-gradient-to-r from-red-700 via-violet-700 to-orange-700  text-transparent'>Find Real Estate</span> <span className='text-red-700 text-7xl'>&</span> <span className='bg-clip-text bg-gradient-to-l from-cyan-500 to-red-700 text-transparent'>Get Your Dream Place</span></h1>
          <p className='text-sm text-slate-100'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, minus dolores, facilis voluptate sequi inventore aliquid architecto veniam illum labore sapiente. Eaque nostrum esse minima atque obcaecati deserunt qui ea.</p>
          <HomeSearch />
          <div className='w-full flex justify-between'>
            <div>
              <h2 className='font-semibold text-3xl text-cyan-600'>16+</h2>
              <p className='text-slate-200 text-sm'>Years of Experience</p>
            </div>
            <div>
              <h2 className='font-semibold text-3xl text-cyan-600'>200</h2>
              <p className='text-slate-200 text-sm'>Award Gained</p>
            </div>
            <div>
              <h2 className='font-semibold text-3xl text-cyan-600'>1200+</h2>
              <p className='text-slate-200 text-sm'>Property Ready</p>
            </div>
          </div>
        </div>
        <div className="relative w-96 h-full">
          <div className='w-[70%] h-full mx-auto bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-900 -z-10 opacity-80 blur-lg' />
          <div className='w-full h-full absolute top-0 left-0 z-10'>
            <div className='absolute top-16 right-0 w-40 h-44 rounded-md border-2 border-slate-200'>
              <img src="/g-1.jpg" alt="gambar-1" className='w-full h-full object-cover rounded-md  shadow-xl shadow-slate-900/70' loading='lazy' />
              </div>
            <div className='absolute bottom-20 left-1/2 -translate-x-1/2 w-56 h-48 rounded-lg border-2 border-slate-200'>
              <img src="/g-2.jpg" alt="gambar-2" className='w-full h-full object-cover rounded-lg  shadow-xl shadow-slate-900/70' loading='lazy' />
              </div>
            <div className='absolute bottom-1/2 righ-1/2 size-44 rounded-full border-2 border-slate-200'>
              <img src="/g-3.jpg" alt="gambar-3" className='w-full h-full object-cover rounded-full shadow-xl shadow-slate-900/70' loading='lazy' />
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}