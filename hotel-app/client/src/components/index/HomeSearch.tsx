
import { useState } from 'react'
import Form from '../auth/Form'
import Input from '../auth/Input'
import Button from '../auth/Button'
import { FaSearch } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SearchSchema } from '../../schema/search.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'

const HomeSearch = () => {
  const navigate=useNavigate()
  const [searchType,setSeacrhType] = useState<string>("buy")

  const {register, handleSubmit}=useForm<z.infer<typeof SearchSchema>>({
    resolver:zodResolver(SearchSchema),
    defaultValues:{
      city:'',
      minPrice:'',
      maxPrice:''
    }
  })

  const onSubmit=(values:z.infer<typeof SearchSchema>)=>{
    navigate({
      to:'/list',
      search:{
       ...(values.city && {city:values.city}),
       ...(values.minPrice && {minPrice:parseInt(values.minPrice)}),
       ...(values.maxPrice && {maxPrice:parseInt(values.maxPrice)}),  
        type:searchType
      }
    })
  }

  return (
    <div className='w-full max-w-xl'>
      <div className="flex relative w-56 border-t-2 border-r-2 border-l-2">
        <button onClick={()=>setSeacrhType('buy')} className={`flex-1 text-center py-2 text-slate-100 font-semibold z-10`}>Buy</button>
        <button onClick={()=>setSeacrhType('rent')} className={`flex-1 text-center py-2 text-slate-100 font-semibold z-10`}>Rent</button>
        <div className={`absolute bg-cyan-700 w-1/2 h-full z-0 ${searchType==="buy"?"left-0":"left-1/2"} transition-all duration-200`} />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-4 items-center">
        <div className="flex-1 flex rounded shadow-xl shadow-slate-700">
          <Input {...register('city')} id='city' name='city' type='text' placeholder='City Location' className='pl-2 py-2 text-sm rounded-l' />
          <Input {...register('minPrice')} id='minPrice' name='minPrice' type='text' placeholder='Min. Price' className='pl-2 py-2 text-sm' />
          <Input {...register('maxPrice')} id='maxPrice' name='maxPrice' type='text' placeholder='Max. Price' className='pl-2 py-2 text-sm rounded-r' />
        </div>
        <Button type="submit" className="p-2 rounded-full bg-orange-600 text-3xl text-slate-200">
          <FaSearch />
        </Button>
      </Form>
    </div>
  )
}

export default HomeSearch
