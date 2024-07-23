import Select from '../auth/Select'
import Form from '../auth/Form'
import Button from '../auth/Button'
import { FaSearch } from 'react-icons/fa'
import Input from '../auth/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchQueryListSchema } from '../../schema/search.zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const optionType=["any","rent","buy"]
const optionProperty=["any","apartement","house","condo","land"]

interface  Props{
    type?:string
    property?:string
    minPrice:string
    maxPrice:string
    city?:string
}

const FormSearch = ({type,property,minPrice,maxPrice, city}:Props) => {
    const navigate=useNavigate()
    const [error, setError]=useState<boolean>(false)

    const {register, handleSubmit}=useForm <z.infer<typeof SearchQueryListSchema>>({
        resolver:zodResolver(SearchQueryListSchema),
        defaultValues:{
            type :type || optionType[0], 
            property:property || optionProperty[0],
            minPrice,
            maxPrice
        }
    })
    const onSubmit=(values:z.infer<typeof SearchQueryListSchema>)=>{
        if(typeof Number(values.minPrice || 0) === 'number' && typeof Number(values.maxPrice || 0) === 'number' ){
            navigate({
                to:'/list',
                search:{
                   ...(city && {city}),
                   ...((values.type &&  values.type!=="any") && {type:(values.type)}),
                   ...((values.property &&  values.property!=="any") && {property:(values.property)}),
                   ...((values.minPrice &&  values.minPrice!=="0") && {minPrice:Number(values.minPrice)}),
                   ...((values.maxPrice &&  values.maxPrice!=="0") && {maxPrice:Number(values.maxPrice)}),
                }
            })
        }else{
            setError(true)
        }
    }

    useEffect(()=>{
        if(error){
            setTimeout(()=>{
                setError(false)
            },2000)
        }
    },[error])

  return (
    <>
        {error && <p className='text-red-500 text-lg animate-pulse'>Please enter a valid price</p>}
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-end">
            <div className='flex-1 flex flex-col items-center'>
                <label htmlFor="type" className="font-semibold text-slate-200">Type</label>
                <Select tags='type' options={optionType} {...register('type')} />
            </div>
            <div className='flex-1 flex flex-col items-center'>
                <label htmlFor="property" className="font-semibold text-slate-200">Property</label>
                <Select tags='property' options={optionProperty} {...register('property')} />
            </div>
            <div className='h-full flex-1 flex flex-col items-center'>
                <label htmlFor="minPrice" className="font-semibold text-slate-200">Min Price</label>
                <Input {...register('minPrice')} id='minPrice' name='minPrice' type='text' placeholder='Min. Price' className='pl-2 h-full' />
            </div>
            <div className='h-full flex-1 flex flex-col items-center'>
                <label htmlFor="maxPrice" className="font-semibold text-slate-200">Max Price</label>
                <Input {...register('maxPrice')} id='maxPrice' name='maxPrice' type='text' placeholder='Max. Price' className='pl-2 h-full' /> 
            </div>
            <Button className="size-12 rounded-full bg-yellow-600 text-slate-100 text-xl ml-4 grid place-items-center hover:bg-red-600 active:opacity-60 transition-all duration-100">
                <FaSearch />
            </Button>
        </Form>
    </>
  )
}

export default FormSearch
