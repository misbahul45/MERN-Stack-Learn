import { MdOutlineCardTravel } from "react-icons/md";
import { FaChessKing, FaCircleUser } from "react-icons/fa6";
import TransitionLink from './TransitionLink';
import { Link, useLocation } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextProvider";
import MenuProfile from "./MenuProfile";
import { FaPenAlt } from "react-icons/fa";
import { fetchUpdateUser } from "../../util/user.fetch";




const Navbar = () => {
    const [showMenu, setShowMenu]=useState<boolean>(false)
    const { pathname }=useLocation()
    const { isAuthenticated, user }:AuthContextType=useContext(AuthContext)
    const [isAgen, setIsAgen]=useState<boolean>(false)

    useEffect(()=>{
        if(user?.isAgen){
            setIsAgen(user.isAgen)
        }
    },[user])

    const handleBecomeToAgents=async()=>{
        if(isAgen){
            return;
        }
        try {
            await fetchUpdateUser({ id:user?.id ||"", user:{ isAgen:true } })
            setIsAgen(true)
        } catch (error) {
            setIsAgen(true)
        }
    }
  return (
    <header className='sticky top-0 left-0 flex justify-center items-center h-16 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 z-30'>
        <div className="w-full max-w-[75%] flex justify-between items-center">
            <div className="flex gap-4 items-center justify-center">
               <Link to="/" className="flex items-center gap-3 text-2xl">
                    <MdOutlineCardTravel className='text-slate-200' />
                    <h1 className="animate-text bg-gradient-to-r from-red-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">KnixxTrav</h1>
               </Link>
               <nav className='flex items-center justify-center gap-2 text-slate-100 font-semibold text-lg'>
                    <TransitionLink className={`w-20 text-center h-full grid place-items-center hover:shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all duration-100 ${pathname==="/" && ("shadow-lg shadow-blue-500")}`} href={'/'} >Home</TransitionLink>
                    <TransitionLink className={`w-20 text-center h-full grid place-items-center hover:shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all duration-100 ${pathname==="/about" && ("shadow-lg shadow-blue-500")}`} href={'/about'}>About</TransitionLink>
                    <TransitionLink className={`w-20 text-center h-full grid place-items-center hover:shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all duration-100 ${pathname==="/contact" && ("shadow-lg shadow-blue-500")}`} href={'/contact'}>Contact</TransitionLink>
                    <TransitionLink className={`w-20 text-center h-full grid place-items-center hover:shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all duration-100 ${pathname==="/agents" && ("shadow-lg shadow-blue-500")}`} href={'/agents'}>Agents</TransitionLink>
               </nav>
            </div>
            <div className='relative h-full flex items-center justify-center gap-4'>
                    {isAuthenticated &&  user?.id ?
                        <>
                            {isAgen?
                            <TransitionLink className="text-slate-100 font-semibold text-lg flex items-center gap-2 border-4 border-blue-700 px-4 py-1 hover:bg-blue-600 hover:shadow-md transition-all duration-100 rounded" href={'/create-post'}>
                                <span>Write</span> 
                                <FaPenAlt />
                            </TransitionLink>
                            :
                            <button onClick={handleBecomeToAgents} className="flex gap-2 px-4 py-1 items-center bg-blue-800 text-slate-100 hover:bg-red-800 transition-all duration-100 rounded shadow shadow-slate-500">
                                <span>to Agent</span>
                                <FaChessKing className="h-[70%] text-yellow-600" />
                            </button>

                            }
                            <div onClick={()=>setShowMenu(prev=>!prev)} className="cursor-pointer">
                                {user?.avatar?
                                    <div className='flex flex-col items-center justify-center border-2 border-slate-200 rounded-full'>
                                        <img src={user.avatar} alt={user.avatar} loading='lazy' className='size-10 object-cover rounded-full' />
                                    </div>
                                    :
                                    <div className='flex flex-col items-center justify-center'>
                                        <FaCircleUser className='text-slate-100 text-4xl' />
                                    </div>
                                }
                            </div>
                            {showMenu && <MenuProfile setShowMenu={setShowMenu} />}
                        </>
                        :
                        <TransitionLink href={'/sign-in'} className="bg-blue-600 px-4 py-2 text-slate-100 font-semibold rounded shadow-md shadow-slate-500 hover:shadow-slate-300 transition-all duration-100">Sign In</TransitionLink>
                    }

            </div>
        </div>
    </header>
  )
}

export default Navbar
