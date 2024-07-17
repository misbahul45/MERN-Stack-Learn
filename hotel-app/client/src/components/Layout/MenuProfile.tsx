import { MdLogout, MdSettings } from 'react-icons/md'
import { motion } from 'framer-motion'
import { FaUserAlt } from 'react-icons/fa'
import TransitionLink from './TransitionLink'
import { useContext } from 'react'
import { AuthContext } from './AuthContextProvider'
import { Link } from '@tanstack/react-router'

interface Props {
    setShowMenu:React.Dispatch<React.SetStateAction<boolean>>
}

const MenuProfile = ({setShowMenu}:Props) => {
    const {signOut}=useContext(AuthContext)
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
    className="size-28 bg-slate-800 border border-slate-100 rounded absolute top-full flex flex-col">
        <TransitionLink href="/profile" className="text-xs flex-1 flex items-center justify-center gap-2 text-slate-100 font-semibold border border-slate-200 hover:bg-gray-700 hover:shadow-md hover:shadow-slate-700 transition-all duration-100">
            <FaUserAlt className="text-sm font-semibold" />
            <span>Profile</span>
        </TransitionLink>
        <TransitionLink href="/settings" className="text-xs flex-1 flex gap-2 items-center justify-center text-slate-100 font-semibold border border-slate-200 hover:bg-gray-700 hover:shadow-md hover:shadow-slate-700 transition-all duration-100">
            <MdSettings className="text-sm font-semibold" />
            <span>Settings</span>
        </TransitionLink>
        <Link to="/sign-in" className="text-xs flex-1 flex items-center justify-center text-slate-100 font-semibold border border-slate-200 hover:bg-gray-700 hover:shadow-md hover:shadow-slate-700 transition-all duration-100">
            <button onClick={signOut} className="flex items-center gap-2 ">
                <MdLogout className="text-sm font-semibold" />
                <span>Logout</span>
            </button>
        </Link>
    </motion.div>
  )
}

export default MenuProfile
