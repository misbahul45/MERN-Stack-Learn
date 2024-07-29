import { useState } from "react"
import Form from "../../components/auth/Form"
import Input from "../../components/auth/Input"
import RichEditor from "../../components/create-post/RichEditor"
import { useForm } from "react-hook-form"
import Select from "../../components/auth/Select"
import Button from "../../components/auth/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreatePostSchema } from "../../schema/create-post.zod"
import { z } from "zod"
import FormAddImage from "./FormAddImage"
import { fetchCreatePost } from "../../util/post.fetch"
import { useNavigate } from "@tanstack/react-router"

const optionType=["rent","buy"]
const optionProperty=["apartement","house","condo","land"]
const optionUtilities=["Owner is responsible", "Tenant is responsible", "Both are responsible"]
const optionPet=["allowed","not allowed"]
const optionIncome=["Income policy", "No income policy"]

interface  Props{
    userId:string
}

const CreatePost = ({userId}:Props) => {
    const navigate=useNavigate()
    const [errorPost, setErrorPost]=useState<boolean | string>(false)

    const [description, setDescription]=useState<string>('')
    const [imgs, setImgs]=useState<string[]>([])
    const {register, handleSubmit, reset}=useForm<z.infer<typeof CreatePostSchema>>({
        resolver:zodResolver(CreatePostSchema),
        defaultValues:{
            title:'',
            price:'0',
            address:'',
            city:'',
            bedroom:'0',
            bathroom:'0',
            latitude:'',
            longitude:'',
            school:'0',
            size:'0',
            type: optionType[0], 
            property: optionProperty[0],
            utilities: optionUtilities[0],
            pet: optionPet[0],
            income: optionIncome[0],
            bus:'0',
            restaurant:'0'
        }
    })

    const onSubmit=async(values:z.infer<typeof CreatePostSchema>)=>{
        const {utilities, pet, income, size, school, bus, restaurant,price, bedroom, bathroom,...dataPost }=values
        if(typeof parseInt(price) !== "number" || typeof parseInt(bedroom) !== "number" || typeof parseInt(bathroom) !== "number" || typeof parseInt(size) !== "number" || typeof parseInt(school) !== "number" || typeof parseInt(bus) !== "number" || typeof parseInt(restaurant) !== "number" ) {
           setErrorPost(true)
           return; 
        }
        const newPost={
            price:parseInt(price),
            bedroom:parseInt(bedroom),
            bathroom:parseInt(bathroom),
            ...dataPost,
            imgs:imgs,
            userId,
            postDetail:{
                utilities,
                pet,
                income,
                size:parseInt(size),
                school:parseInt(school),
                bus:parseInt(bus),
                restaurant:parseInt(restaurant),
                desc:description
            }
        }
        try {
            const post = await fetchCreatePost(newPost);
    
            if (post.status >= 400) {
                setErrorPost(post.message);
            }
            reset({
                title:'',
                price:'0',
                address:'',
                city:'',
                bedroom:'0',
                bathroom:'0',
                latitude:'',
                longitude:'',
                school:'0',
                size:'0',
                type: optionType[0], 
                property: optionProperty[0],
                utilities: optionUtilities[0],
                pet: optionPet[0],
                income: optionIncome[0],
                bus:'0',
                restaurant:'0'
            })
            setImgs([])
            setDescription('')
            navigate({to:'/list'})
            
        } catch (error) {
            console.error('Error creating post:', error);
            setErrorPost(true);
        }
    }

  return (
    <div className="flex flex-col justify-center items-center gap-8 py-12">
       <h1 className="text-3xl animate-text bg-gradient-to-r from-red-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">Create a New Post</h1>
        {errorPost && <p className="text-red-500">Please fill in all the fields with correct data</p>}
        <FormAddImage setImgs={setImgs} imgs={imgs} />

      <Form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 max-w-3xl">
        <div className="flex gap-2 items-center">
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="title" className="font-semibold text-sm text-slate-200">Title</label>
                <Input {...register('title')} id="title" name="title" type="text" placeholder="Title...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="price" className="font-semibold text-sm text-slate-200">Price</label>
                <Input {...register('price')} id="price" name="price" type="text" placeholder="Price...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="address" className="font-semibold text-sm text-slate-200">Address</label>
                <Input {...register('address')} id="address" name="address" type="text" placeholder="Address...." className="py-2 pl-2 rounded w-full" />
            </div>
        </div>
        <div className="flex-1 w-full bg-slate-700">
            <RichEditor setModel={setDescription} />
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="city" className="font-semibold text-sm text-slate-200">City</label>
                <Input {...register('city')} id="city" name="city" type="text" placeholder="City...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="bedroom" className="font-semibold text-sm text-slate-200">Bedroom Number</label>
                <Input {...register('bedroom')} id="bedroom" name="bedroom" type="text" placeholder="bedroom...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="bathroom" className="font-semibold text-sm text-slate-200">Bathroom Number</label>
                <Input {...register('bathroom')} id="bathroom" name="bathroom" type="text" placeholder="Bathroom Number...." className="py-2 pl-2 rounded w-full" />
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="latitude" className="font-semibold text-sm text-slate-200">Latitude</label>
                <Input {...register('latitude')} id="latitude" name="latitude" type="text" placeholder="Latitude...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="longitude" className="font-semibold text-sm text-slate-200">Longitude Number</label>
                <Input {...register('longitude')} id="longitude" name="longitude" type="text" placeholder="Longitude...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="Type" className="text-sm font-semibold text-slate-200">Type</label>
                <Select options={optionType} tags="Type" {...register('type')} />
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="Property" className="text-sm font-semibold text-slate-200">Property</label>
                <Select options={optionProperty} tags="Property" {...register('property')} />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="utilities" className="text-sm font-semibold text-slate-200">Utilities Policy</label>
                <Select options={optionUtilities} tags="utilities" {...register('utilities')} />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="pet" className="text-sm font-semibold text-slate-200">Pet Policy</label>
                <Select options={optionPet} tags="pet" {...register('pet')} />
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="income" className="text-sm font-semibold text-slate-200">Income Policy</label>
                <Select options={optionIncome} tags="income" {...register('income')} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="size" className="font-semibold text-sm text-slate-200">Size(M) </label>
                <Input {...register('size')} id="size" name="size" type="text" placeholder="Size...." className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="school" className="font-semibold text-sm text-slate-200">School(m)</label>
                <Input {...register('school')} id="school" name="school" type="text" placeholder="Distance to school" className="py-2 pl-2 rounded w-full" />
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="restaurant" className="font-semibold text-sm text-slate-200">Restaurant(m)</label>
                <Input {...register('restaurant')} id="restaurant" name="restaurant" type="text" placeholder="Distance to school" className="py-2 pl-2 rounded w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="bus" className="font-semibold text-sm text-slate-200">Bus(m)</label>
                <Input {...register('bus')} id="bus" name="bus" type="text" placeholder="Distance to school" className="py-2 pl-2 rounded w-full" />
            </div>
        </div>
        <Button type="submit" className="mt-4 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 text-slate-100 py-2.5 rounded-md font-semibold hover:via-red-700 transition-all duration-100">Submit</Button>
      </Form>
    </div>
  )
}

export default CreatePost
