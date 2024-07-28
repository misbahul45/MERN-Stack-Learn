import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { fetchGetSinglePost, fetchSavePost } from '../util/post.fetch'
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
import { CiBookmark, CiBookmarkPlus } from 'react-icons/ci';
import { TiMessageTyping } from 'react-icons/ti';
import React from 'react';

export const Route = createFileRoute('/posts/$slug')({
  component: PostPage,
  loader: async ({ params:{ slug }}) => {
      const data=await fetchGetSinglePost(slug)
      return {
        ...data,
      }
  },
})




function  PostPage() {
  const navigate=useNavigate()
  const {authenticated:{ user }}=Route.useRouteContext()
  const post:Post=Route.useLoaderData()

  const [savePost, setSavePost] = React.useState<boolean>(post.isSaved || false);
 

  const propertyType=post.property==="house"?<FaHouse className='text-lg text-slate-400' />
                    :post.property==="land"?<FaLandmark className='text-lg text-slate-400' />
                    :post.property==="hotel"?<FaHotel className='text-lg text-slate-400' />:<MdApartment className='text-lg text-slate-400' />

  const handleSave=async()=>{
    if(!user?.id){
      return navigate({
        to:'/sign-in'
      })
    }
    await fetchSavePost(post?.id)
    if(savePost){
     setSavePost(false)
    }else{
     setSavePost(true)
    }
  }

  return(
    <section className='w-full h-full max-w-[90%]'>
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
            <UserProfile userId={post?.userId} />
          </div>
          <div className='text-slate-100'>
            <FroalaEditorView
              model={post?.postDetail.desc}
            />
          </div>
        </div>
        <div className='w-full max-w-sm h-full bg-white/5 backdrop-blur p-4 flex flex-col gap-4 rounded-md shadow-lg shadow-slate-300/20'>
          <div className="flex-1 flex justify-center gap-4">
            <button onClick={handleSave} className={`flex-1 flex justify-center items-center gap-2 rounded ${savePost?"bg-gray-900":"bg-slate-700"} text-lg text-slate-200 shadow shadow-slate-300 cursor-pointer hover:bg-gray-900 transition-all duration-100`}>
              {savePost?<CiBookmark className="h-10"/>:<CiBookmarkPlus className="h-10"/>}
              <span>Saved post</span>
            </button>
            <button className="flex-1 flex justify-center items-center gap-2 rounded bg-slate-700 text-lg text-slate-200 shadow shadow-slate-300 hover:bg-gray-900 cursor-pointer transition-all duration-100">
                <TiMessageTyping className="h-10" />
                <span>Message</span>
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-slate-100 font-semibold'>General</h1>
            <div className='flex flex-col gap-2 px-4 py-2.5 rounded-md bg-slate-600'>
              <Icon icon={<GiNautilusShell className='text-lg text-slate-400' />} title='Utilities' desc={post.postDetail.utilities} />
              <Icon icon={<MdOutlinePets className='text-lg text-slate-400'  />} title='Pet Policy' desc={post.postDetail.pet} />
              <Icon icon={propertyType} title='Property Type' desc={post.property} />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-slate-100 font-semibold'>Sizes</h1>
            <div className='flex justify-between items-center px-4 py-2.5 rounded-md bg-slate-600'> 
              <Icon icon={<BsTextarea className='text-lg text-slate-400' />} desc={`${post.postDetail.size}m`} />
              <Icon icon={<FaBed className='text-lg text-slate-400' />} desc={`${post.bedroom >1?`${post.bedroom} Beds`:`${post.bedroom} Bedroom`}`} />
              <Icon icon={<FaBath className='text-lg text-slate-400' />} desc={`${post.bathroom >1?`${post.bathroom} Baths`:`${post.bathroom} Bathroom`}`} />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-slate-100 font-semibold'>Nearby Places</h1>
            <div className='flex justify-between items-center px-4 py-2.5 rounded-md bg-slate-600'> 
              <Icon icon={<FaSchool className='text-lg text-slate-400' />} desc={`${post.postDetail.school}m away`} />
              <Icon icon={<FaBusAlt className='text-lg text-slate-400' />} desc={`${post.postDetail.bus}m away`} />
              <Icon icon={<IoMdRestaurant className='text-lg text-slate-400' />} desc={`${post.postDetail.restaurant}m away`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}