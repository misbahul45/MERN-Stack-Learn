import { useState } from "react"
import CloudinaryUploadWidget from "../../components/upload/CloudinaryUploadWidget"
import { FaImage } from "react-icons/fa6"
import { IoIosCloseCircle } from "react-icons/io";

interface Props{
    imgs:string[],
    setImgs:React.Dispatch<React.SetStateAction<string[]>>
}
const FormAddImage = ({imgs, setImgs}:Props) => {
    const [showImg, setShowImg]=useState(0)
    const handleDeleteImage=(img:string)=>{
      setImgs(prev=>prev.filter(item=>item!==img))
    }
  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4">
     <div className="w-full flex flex-col gap-4">
        <div className="w-full h-96">
          {imgs.length>0?
          <img src={imgs[showImg]} alt={imgs[showImg]} loading="lazy" className="w-full h-full object-cover" />
          :
          <div className="w-full h-full rounded-md bg-slate-200 flex flex-col justify-center items-center">
            <FaImage className="w-[70%] h-[70%]" />
            <h1 className="text-slate-400 font-semibold text-2xl uppercase ">No Image</h1>
          </div>
          }
        </div>
        <CloudinaryUploadWidget uwConfig={{
              cloudName:'dbr5w40cx',
              uploadPreset:'hotel-app',
              multiple:true,
              maxImageFileSize: 5000000,
              folder:"posts",
            }}
              setPublicId={setImgs}
          />
     </div>
      <div className="flex gap-4 flex-wrap">
        {imgs.length>=1&& imgs.map((img, i)=>(
            <div key={img+i} onClick={()=>setShowImg(i)} className="relative min-w-56 max-w-56 h-48 rounded shadow-xl shadow-slate-600 cursor-pointer hover:scale-105 transition-all duration-100">
                <img src={img} alt={img} className="rounded object-cover h-full w-full" />
                <IoIosCloseCircle onClick={()=>handleDeleteImage(img)} className="absolute top-0 right-0 text-3xl text-red-500 cursor-pointer" />
            </div>
        ))}
      </div>
    </div>
  )
}

export default FormAddImage
