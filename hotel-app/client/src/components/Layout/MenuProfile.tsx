import { MdLogout, MdSettings } from 'react-icons/md'
import { motion } from 'framer-motion'
import { FaUserAlt } from 'react-icons/fa'
import TransitionLink from './TransitionLink'
import { useContext } from 'react'
import { AuthContext } from './AuthContextProvider'
import { useNavigate } from '@tanstack/react-router'

interface Props {
    setShowMenu:React.Dispatch<React.SetStateAction<boolean>>
}

const MenuProfile = ({setShowMenu}:Props) => {
    const navigate=useNavigate()
    const { user }=useContext(AuthContext)

    const {signOut}=useContext(AuthContext)
    const handleLogout=()=>{
        signOut()
        navigate({to: '/sign-in'})
    } 


  return (
    <motion.div
    onClick={()=>setShowMenu(false)}
    animate={{
      opacity:[0,1],
      transform: ['translateY(-20px)', 'translateY(0px)'],
      transition: {
          duration:0.5,
          type: 'spring'
      },
    }}
    exit={{
      opacity:[1,0],
      transform: ['translateY(0px)', 'translateY(-20px)'],
      transition: {
          duration:0.5,
          type: 'spring'
      }
    }}
    className="absolute top-[120%] left-1/2 -translate-x-1/2 size-28 bg-slate-800 border border-slate-100 rounded flex flex-col">
        <TransitionLink href="/profile/$id" params={user?.id} className="text-xs flex-1 flex items-center justify-center gap-2 text-slate-100 font-semibold border border-slate-200 hover:bg-gray-700 hover:shadow-md hover:shadow-slate-700 transition-all duration-100">
            <FaUserAlt className="text-sm font-semibold" />
            <span>Profile</span>
        </TransitionLink>
        <TransitionLink href="/settings" className="text-xs flex-1 flex gap-2 items-center justify-center text-slate-100 font-semibold border border-slate-200 hover:bg-gray-700 hover:shadow-md hover:shadow-slate-700 transition-all duration-100">
            <MdSettings className="text-sm font-semibold" />
            <span>Settings</span>
        </TransitionLink>
        <button onClick={handleLogout} className="text-xs flex-1 flex gap-2 items-center justify-center text-slate-100 font-semibold border border-slate-200 hover:bg-gray-700 hover:shadow-md hover:shadow-slate-700 transition-all duration-100">
            <MdLogout className="text-sm font-semibold" />
            <span>Logout</span>
        </button>
    </motion.div>
  )
}

export default MenuProfile
