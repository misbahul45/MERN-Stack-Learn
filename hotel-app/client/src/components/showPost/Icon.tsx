import React from 'react'

interface Props {   
    icon:React.ReactNode,
    title?:string,
    desc:string
}

const Icon = ({ icon, title, desc }:Props) => {
  return (
    <div className={`flex-1 flex ${title?"gap-4":"gap-2"} items-center`}>
      {icon}
      <div>
        <h1 className='text-lg font-semibold text-slate-100'>{title}</h1>
        <p className='text-slate-200'>{desc}</p>
      </div>
    </div>
  )
}

export default Icon
