import React, { useContext, useState } from 'react'
import Form from '../../components/auth/Form'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import { AuthContext } from '../../components/Layout/AuthContextProvider'
import { FaUser } from 'react-icons/fa6'
import { useNavigate } from '@tanstack/react-router'

const Settings = () => {
  const { user, updateUser }=useContext(AuthContext)
  const navigate=useNavigate()

  const [username, setUserName]=useState(user.username)
  const [email, setEmail]=useState(user.email)

  const onInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.name==='username'){
      setUserName(e.target.value)
    }else if(e.target.name==='email'){
      setEmail(e.target.value)
    }
  }

  const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    updateUser({id:user.id, user:{username, email}})
    navigate({
      to:'/profile'
    })
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center py-8'>
      <h1 className='text-4xl animate-text bg-gradient-to-r from-cyan-500 via-red-500 to-cyan-500 bg-clip-text text-transparent font-semibold text-center mb-6'>Settings Profile {user.username}</h1>
      <Form onSubmit={onSubmit} className="flex flex-col gap-6 w-full max-w-xl">
        <div className='mx-auto size-40 rounded-full border-2 border-slate-600 grid place-items-center'>
          {user.avatar?
            <img src={user.avatar} alt="avatar" className='w-full h-full object-cover rounded-full' />
            :
            <FaUser className='w-full h-[70%] object-cover rounded-full text-slate-100' />
          }
        </div>
        <Button type="button" className="block mx-auto text-slate-200 font-semibold w-48 py-2 animate-text bg-gradient-to-r from-slate-700 via-blue-600 to-slate-700 rounded-md hover:via-red-700 transition-all duration-100">Change Avatar</Button>
        <div className='flex flex-col gap'>
          <label htmlFor="username" className='text-xl text-slate-200 font-semibold'>Username<span className='text-red-500'>*</span></label>
          <Input value={username} onChange={onInputChange} id="username" name="username" type="text" placeholder="Username" className="pl-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4 focus:ring-green-500 invalid:focus:ring-pink-700" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="username" className='text-xl text-slate-200 font-semibold'>Email<span className='text-red-500'>*</span></label>
          <Input value={email} onChange={onInputChange} id="email" name="email" type="text" placeholder="email" className="pl-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4 focus:ring-green-500 invalid:focus:ring-pink-700" />
        </div>
        <Button type="submit" className="mt-4 animate-text bg-gradient-to-r from-slate-700 via-cyan-400 to-slate-700 text-slate-100 py-2.5 rounded-md font-semibold hover:via-blue-600 transition-all duration-100" type="submit">Update Profile</Button>
      </Form>
    </div>
  )
}

export default Settings
