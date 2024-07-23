import { useNavigate } from "@tanstack/react-router";
import { FaBath, FaBed, FaImage } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { TiMessageTyping } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { Suspense } from "react";

interface Props extends Post {
  isLoading?:boolean
}



const PostComponent = ({ title, slug, price, imgs, address, bathroom, bedroom, isLoading }: Props) => {
  const navigate=useNavigate()
  const goPost=()=>{
    navigate({
      to:`/posts/${slug}`,
      params:{
        slug
      }
    })
  }
  if(isLoading){
    return (
      <div className="w-full flex gap-4">
          <div className="size-56 flex justify-center items-center">
            <div className="size-16 rounded-full border-t-4 border-slate-400 animate-spin"></div>
          </div>
          <div className="flex-1  flex items-center justify-center">
            <div className="size-24 rounded-full border-t-4 border-slate-400 animate-spin"></div>
          </div>
      </div>
    )
  }

  return (
    <div onClick={goPost} className="flex-1 flex gap-4 hover:bg-white/10 hover:backdrop-blur-md p-4 rounded-lg cursor-pointer">
      <div className="size-56">
        <Suspense fallback={<FaImage className="w-full h-full text-gray-900" />}>
          {imgs.length > 0 ? (
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
      <div className="flex-1 py-2 flex flex-col justify-between">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-slate-200">{title}</h1>
          <h2 className="flex gap-3 items-center text-slate-100">
            <FaLocationDot />
            <span>{address}</span>
          </h2>
          <p className="w-40 text-center py-2 bg-cyan-600 text-slate-100 rounded-md shadow-lg shadow-slate-600 cursor-default">
            Rp{price.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex justify-between items-center">
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
          <div className="w-44 flex justify-center gap-4">
            <button className="size-7 p-0.5 rounded bg-slate-700 text-xl text-slate-200 shadow shadow-slate-300 cursor-pointer hover:bg-red-800 hover:scale-105 transition-all duration-100">
              <CiBookmarkPlus className="w-full h-full" />
            </button>
            <button  className="size-7 p-0.5 rounded bg-slate-700 text-xl text-slate-200 shadow shadow-slate-300 cursor-pointer hover:bg-red-800 hover:scale-105 transition-all duration-100">
                <TiMessageTyping className="w-full h-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
