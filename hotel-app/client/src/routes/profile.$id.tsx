import { createFileRoute, Navigate } from '@tanstack/react-router'
import { fetchGetAllPosts, fetchGetAllSavedPost } from '../util/post.fetch'
import { useContext } from 'react'
import { AuthContext } from '../components/Layout/AuthContextProvider'
import DisplayAllPosts from '../components/list/DisplayAllPosts'
import { FaChessKing } from 'react-icons/fa'

export const Route = createFileRoute('/profile/$id')({
  component:ProfilePage,
  loader:async({params:{ id }})=>{
    const posts:Post[] | any=await fetchGetAllPosts({ userId:id })
    const savedPosts:Post[] | any=await fetchGetAllSavedPost()
    return [...posts,...savedPosts]
  }
})

function ProfilePage(){
  const { user }=useContext(AuthContext)
  const posts:Post[]=Route.useLoaderData()

  if(!user?.id){
    return <Navigate to='/sign-in' />
  }
  return(
    <section className='w-full max-w-3xl py-8'>
      <div className="mb-10 flex justify-center items-center gap-6">
        <img src={user?.avatar} alt="userimage" loading='lazy' className='size-48 rounded-full object-cover shadow-xl shadow-slate-800' />
        <div>
          <h1 className='text-3xl text-slate-100 font-extrabold'>{user.username}</h1>
          <h2 className='mt-4 text-xl text-slate-600 font-extrabold'>{user.email}</h2>
          {user.isAgen&&(
            <div className='mx-auto max-w-48 mt-4 px-4 py-2 flex gap-4 bg-slate-700 justify-center items-center rounded-full shadow-xl shadow-violet-600'>
              <FaChessKing className='h-full text-yellow-500' />
              <span className='text-lg animate-text bg-clip-text text-transparent font-bold bg-gradient-to-tr from-red-500 via-violet-500 to-red-500'>User is Agents</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center mb-6">
        <span className='flex-1 h-1 rounded-fulll bg-violet-500' />
        <h1 className='text-xl text-slate-100 font-semibold'>My Lists</h1>
        <span className='flex-1 h-1 rounded-fulll bg-violet-500' />
      </div>
      <DisplayAllPosts posts={posts} />
    </section>
  )
}