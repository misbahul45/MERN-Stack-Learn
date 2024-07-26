import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { fetchGetSinglePost } from '../util/post.fetch'
import DisplayImgaes from '../components/showPost/DisplayImgaes'
import Icon from '../components/showPost/Icon'

import { GiNautilusShell } from "react-icons/gi";
import { FaBath, FaBed, FaHotel, FaHouse, FaLandmark, FaSchool } from 'react-icons/fa6'
import { MdApartment, MdOutlinePets } from 'react-icons/md'
import { BsTextarea } from "react-icons/bs";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import { IoMdRestaurant } from 'react-icons/io';
import { FaBusAlt } from 'react-icons/fa';
import UserProfile from '../components/showPost/UserProfile';
import { CiBookmarkPlus } from 'react-icons/ci';
import { TiMessageTyping } from 'react-icons/ti';

export const Route = createFileRoute('/posts/$slug')({
  component: PostPage,
  loader: async ({ params:{ slug }}) => {
      const post=await fetchGetSinglePost(slug)
      return {
        ...post
      }
  },
})




function  PostPage() {
  const navigate=useNavigate()
  const {authenticated:{ user }}=Route.useRouteContext()
  const post:Post=Route.useLoaderData()

  const propertyType=post.property==="house"?<FaHouse className='text-xl text-slate-400' />
                    :post.property==="land"?<FaLandmark className='text-xl text-slate-400' />
                    :post.property==="hotel"?<FaHotel className='text-xl text-slate-400' />:<MdApartment className='text-xl text-slate-400' />

  const handleSave=async()=>{
    if(!user?.id){
      return navigate({
        to:'/sign-in'
      })
    }
  }

  return(
    <section className='w-full h-full max-w-[80%]'>
      <div className='flex justify-around gap-4 py-8'>
        <div className='w-full flex flex-col gap-8'>
          <DisplayImgaes images={post?.imgs} />
          <h1 className='text-4xl font-semibold text-slate-200'>{post?.title}</h1>
          <div className="flex justify-between">
            <div>
              <p className='text-slate-100 mb-4'>{post?.address}</p>
              <p className="w-40 text-center py-2 bg-cyan-600 text-slate-100 rounded-md shadow-lg shadow-slate-600 cursor-default">
                Rp{post.price.toLocaleString("id-ID")}
              </p>
            </div>
            <UserProfile userId={post.userId} />
          </div>
          <div className='text-slate-100'>
            <FroalaEditorView
              model={post?.postDetail.desc}
            />
          </div>
        </div>
        <div className='w-full max-w-md h-full bg-white/5 backdrop-blur py-8 flex flex-col  gap-4 px-6 shadow-lg shadow-slate-300/20'>
        <div className="flex-1 flex justify-center gap-8">
            <button onClick={handleSave} className={`flex-1 flex justify-center items-center gap-2 rounded bg-slate-700 text-xl text-slate-200 shadow shadow-slate-300 cursor-pointer hover:bg-green-700 hover:scale-105 transition-all duration-100`}>
              <CiBookmarkPlus className="h-10" />
              <span>Saved post</span>
            </button>
            <button className="flex-1 flex justify-center items-center gap-2 rounded bg-slate-700 text-xl text-slate-200 shadow shadow-slate-300 cursor-pointer hover:bg-red-800 hover:scale-105 transition-all duration-100">
                <TiMessageTyping className="h-10l" />
                <span>Send Message</span>
            </button>
          </div>

          <div className='flex flex-col gap-6'>
            <h1 className='text-xl text-slate-100 font-semibold'>General</h1>
            <div className='flex flex-col gap-2 px-4 py-2.5 rounded-md bg-slate-600'>
              <Icon icon={<GiNautilusShell className='text-xl text-slate-400' />} title='Utilities' desc={post.postDetail.utilities} />
              <Icon icon={<MdOutlinePets className='text-xl text-slate-400'  />} title='Pet Policy' desc={post.postDetail.pet} />
              <Icon icon={propertyType} title='Property Type' desc={post.property} />
            </div>
          </div>
          <div className=' flex flex-col gap-6'>
            <h1 className='text-xl text-slate-100 font-semibold'>Sizes</h1>
            <div className='flex justify-between items-center px-4 py-2.5 rounded-md bg-slate-600'> 
              <Icon icon={<BsTextarea className='text-xl text-slate-400' />} desc={`${post.postDetail.size} Meter`} />
              <Icon icon={<FaBed className='text-xl text-slate-400' />} desc={`${post.bedroom >1?`${post.bedroom} Bedrooms`:`${post.bedroom} Bedroom`}`} />
              <Icon icon={<FaBath className='text-xl text-slate-400' />} desc={`${post.bathroom >1?`${post.bathroom} Bathrooms`:`${post.bathroom} Bathroom`}`} />
            </div>
          </div>
          <div className=' flex flex-col gap-6'>
            <h1 className='text-xl text-slate-100 font-semibold'>Nearby Places</h1>
            <div className='flex justify-between items-center px-4 py-2.5 rounded-md bg-slate-600'> 
              <Icon icon={<FaSchool className='text-xl text-slate-400' />} desc={`${post.postDetail.school}m away`} />
              <Icon icon={<FaBusAlt className='text-xl text-slate-400' />} desc={`${post.postDetail.bus}m away`} />
              <Icon icon={<IoMdRestaurant className='text-xl text-slate-400' />} desc={`${post.postDetail.restaurant}m away`} />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}