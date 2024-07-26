import React from 'react'
import { fetchGetSingleUser } from '../../util/user.fetch'
import { FaUserAlt } from 'react-icons/fa'

interface Props{
    userId:string
}
const UserProfile = ({userId}:Props) => {
    const [user, setUser] = React.useState<User | null>()
    React.useEffect(()=>{
        const fetchUser=async()=>{
            const user=await fetchGetSingleUser(userId)
            setUser(user)
        } 
        fetchUser()
    },[])
  return (
    <div className='bg-blue-500 text-slate-100 p-4 rounded shadow-md shadow-slate-200'>
      {user?.avatar?
         <img src={user?.avatar ||""} alt="author image" className='block mx-auto size-12 rounded-full object-cover' />
         :
         <div className="flex justify-center items-center size-12 rounded-full border-2 border-slate-600 ">
            <FaUserAlt className='w-full h-[70%] text-slate-100' />
         </div>
    }
    <h1>{user?.username}</h1>
    </div>
  )
}

export default UserProfile
