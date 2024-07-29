import  { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
interface CarouselProps {
  children: React.ReactNode,
  length:number
}

const Carousel=({ children, length }:CarouselProps)=>{
  const [currentIndex, setCurrentIndex] = useState(0);

  const next=()=>{
    currentIndex===length-1?setCurrentIndex(0):setCurrentIndex(prev=>prev+1)
  }
  const prev=()=>{
    currentIndex===0?setCurrentIndex(length-1):setCurrentIndex(prev=>prev-1)
  }

  return(
  <div className='flex flex-col items-center gap-4'>
      <div className='overflow-hidden w-full h-96 relative'>
        <div className="flex transition-transform ease-out duration-500" style={{ transform:`translateX(-${currentIndex * 100}%)`}}>
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button onClick={prev} className='size-8 p-1 rounded-full bg-slate-700 text-slate-100'>
            <IoIosArrowBack className='w-full h-full' />
          </button>
          {length>1&&(
          <button onClick={next} className='size-8 p-1 rounded-full bg-slate-700 text-slate-100'>
            <IoIosArrowForward className='w-full h-full' />
          </button>
          )}
        </div>
      </div>
      {length > 1 && (
        <div className="flex gap-1 items-center">
          {[...Array(length)].map((_, i) => {
            return(
              <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`size-2 rounded-full ${currentIndex === i ? "bg-slate-100" : "bg-slate-700"} transition-all duration-200`}
            />
            )
        })}
        </div>
      )}
    </div>
  )
}

interface Props {
  images:string[]
}

const DisplayImgaes = ({ images }:Props) => {
  return (
    <Carousel length={images.length}>
      {images.map((img, i)=>(
        <img key={i} src={img} alt={img} loading='lazy' className="w-full h-full object-fill" />
      ))}
    </Carousel>
  )
}

export default DisplayImgaes
