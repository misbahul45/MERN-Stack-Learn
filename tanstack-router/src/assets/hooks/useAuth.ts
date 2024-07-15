export const useAuth=()=>{
 const { login }={ login:true }
 return{
  login
 }
}


export type AuthContext=ReturnType<typeof useAuth>