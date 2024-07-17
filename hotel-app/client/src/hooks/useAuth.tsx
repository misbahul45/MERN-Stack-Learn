import {  useState } from "react"
import { loginUser } from "../util/auth.fetch"
import { fetchUpdateUser } from "../util/user.fetch"




const useAuth = () => {
  const [user, setUser]=useState<User>(JSON.parse(localStorage.getItem("user") || "{}"))
  const SignIn=async(userLogin:loginUser)=>{
    if(userLogin){
      const res=await loginUser(userLogin)
      console.log(res)
  
      if(res){
        setUser(res)
        localStorage.setItem("user", JSON.stringify(res))
      }
    }
  }

  const SignOut=()=>{
    setUser({} as User)
    localStorage.clear()
  }

  const updateUser=async({id, user}:UpdateUser)=>{
    const res=await fetchUpdateUser({id, user})
    if(res){
      setUser(res)
      localStorage.setItem("user", JSON.stringify(res))
    }
  }


  return {user, SignIn, SignOut, updateUser}
}

export default useAuth
