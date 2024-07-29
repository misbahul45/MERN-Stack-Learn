import { useNavigate } from "@tanstack/react-router";
import { FaBath, FaBed, FaImage } from "react-icons/fa";
import { CiBookmark, CiBookmarkPlus } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import React, { Suspense, useEffect } from "react";
import { AuthContext } from "../Layout/AuthContextProvider";
import { fetchGetSavedPost, fetchSavePost } from "../../util/post.fetch";

interface Props extends Post {}

const sleep = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const PostComponent = ({ id, title, slug, price, imgs, address, bathroom, bedroom,userId,  type }: Props) => {
  const navigate=useNavigate()
  const { user }=React.useContext(AuthContext)

  const [savePost, setSavePost] = React.useState<boolean>(false);
  const [isLoading, setIsLoading]=React.useState<boolean>(true)

  useEffect(() => {
    const getSavedPost = async () => {
      const save=await fetchGetSavedPost(id)
      setSavePost(save)
    }
    getSavedPost()
  }, []);

  useEffect(()=>{
   const stopLoading=async()=>{
    if(id){
      await sleep(1200)
      setIsLoading(false)
    }
   }
   stopLoading()
  },[])

  const goPost=()=>{
    navigate({
      to:`/posts/${slug}`,
      params:{
        slug
      }
    })
  }

  const handleSave=async()=>{
    if(!user?.id){
      return navigate({
        to:'/sign-in'
      })
    }
    await fetchSavePost(id)
   if(savePost){
    setSavePost(false)
   }else{
    setSavePost(true)
   }
  }


  if(isLoading){
    return (
      <div className="w-full flex gap-4">
          <div className="size-32 flex justify-center items-center">
            <div className="size-16 rounded-full border-t-4 border-slate-400 animate-spin"></div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="size-20 rounded-full border-t-4 border-slate-400 animate-spin"></div>
          </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex gap-4 items-center">
      <div className="size-44">
        <Suspense fallback={<FaImage className="w-full h-full text-gray-900" />}>
          {imgs?.length > 0 ? (
            <img
              src={imgs[0]}
              alt={imgs[0]}
              loading="lazy"
              className="w-full h-full object-cover rounded-md shadow-md shadow-slate-200 transition-all duration-100"
            />
          ) : (
            <FaImage className="w-full h-full text-gray-700" />
          )}
        </Suspense>
      </div>
      <div className="flex-1 py-2 flex flex-col justify-between gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-200 mb-2">{title}</h1>
            <button onClick={goPost} className="text-blue-500 hover:text-blue-700 hover:border-b-2 hover:border-blue-600 transition-all duration-100">Read more</button>
          </div>
          <h2 className="flex gap-3 items-center text-slate-100 mb-4">
            <FaLocationDot />
            <span>{address}</span>
          </h2>
          <div className="flex gap-6">
            <span className="px-4 py-2 bg-cyan-600 text-slate-100 rounded-md shadow-lg shadow-slate-700 cursor-default">
              Rp{price?.toLocaleString("id-ID")}
            </span>
            <span className="px-4 py-2 bg-violet-600 text-slate-100 uppercase font-bold rounded-md shadow-lg shadow-slate-700 cursor-default">
              {type}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-6">
          <div className="flex-1 flex gap-4 items-center">
            <div className="flex-1 flex items-center gap-4 bg-slate-700 text-slate-200 py-1 px-2 rounded">
              <FaBath />
              <span>{bathroom} Bathroom</span>
            </div>
            <div className="flex-1 flex items-center gap-4 bg-slate-700 text-slate-200 py-1 px-2 rounded">
              <FaBed />
              <span>{bedroom} Bedroom</span>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {!(userId===user?.id) && (
              <>
                <button onClick={handleSave} className={`size-7 p-0.5 rounded text-xl text-slate-200 shadow shadow-slate-300 cursor-pointer hover:bg-gray-900 hover:scale-105 transition-all duration-100 ${savePost?"bg-gray-900":"bg-slate-700"}`}>
                  {savePost?<CiBookmark className="w-full h-full" />:<CiBookmarkPlus className="w-full h-full" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
