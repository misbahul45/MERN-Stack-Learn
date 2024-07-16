import {  useState } from "react"
import { loginUser } from "../util/auth.fetch"

interface loginUser{
  email:string
  password:string
}

const useAuth = () => {
  const [user, setUser]=useState<User>(JSON.parse(localStorage.getItem("user") || "{}"))
  const SignIn=async(userLogin:loginUser)=>{
    if(userLogin){
      const res=await loginUser(userLogin)
      if(res){
        setUser(res)
        localStorage.setItem("user", JSON.stringify(res))
      }
    }
  }

  return {user, SignIn}
}

export default useAuth
