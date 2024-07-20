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
    user:User,
    isError:boolean,
    messageError:string
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

  interface CreatePostDetail{
    desc:string
    utilities:string
    pet:string
    income:string
    size:number 
    school:number
    bus:number
    restaurant:number
  }

interface CreatePost{
    title:string
    price:number
    imgs:string[]
    address:string,
    city:string
    bedroom:number
    bathroom:number
    latitude:string
    longitude:string
    type:string
    property:string
    userId:string

}