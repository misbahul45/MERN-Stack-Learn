import {  useEffect, useState } from "react"
import { loginUser } from "../util/auth.fetch"
import { fetchUpdateUser } from "../util/user.fetch"




const useAuth = () => {
  const [isError, setIsError]=useState<boolean>(false)
  const [messageError, setMessageError]=useState<string>("")
  const [user, setUser]=useState<User>()

  useEffect(()=>{
    const user=localStorage.getItem("user")
    if(user){
      setUser(JSON.parse(user))
    }
  },[])

  const SignIn=async(userLogin:loginUser)=>{
    try {
      if(userLogin){
        const res=await loginUser(userLogin)
        if(res.id){
          setUser(res)
          localStorage.setItem("user", JSON.stringify(res))
        }else{
          setIsError(true)
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setMessageError(error.message)
      setIsError(true)
    }
  }

  const SignOut=()=>{
    setUser({} as User)
    localStorage.clear()
  }

  const updateUser=async({id, user}:UpdateUser)=>{
    try {
      const res=await fetchUpdateUser({id, user})
      if(res){
        setUser(res)
        localStorage.setItem("user", JSON.stringify(res))
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setMessageError(error.message)
      setIsError(true)
    }
  }


  return {user, SignIn, SignOut, updateUser, isError, messageError}
}

export default useAuth
