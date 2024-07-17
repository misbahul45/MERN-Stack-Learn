interface User{
    id:string,
    username:string,
    email:string,
    avatar:string,
    createdAt:string
}
  interface  MyRouterContext{
    authenticated:{
      user?:User
    }
  }

  interface loginUser{
    email:string
    password:string
  }

  interface AuthContextType {
    isAuthenticated: boolean;
    signIn: (credentials: { email: string; password: string }) => void;
    signOut: () => void;
    updateUser:({id, user}:UpdateUser)=>void;
    user:User
  }

  interface UpdateUserSchema{
    username?:string
    email?:string
    password?:string
    avatar?:string
  }

  interface UpdateUser{
    id:string
    user:Partial<UpdateUserSchema>
  }