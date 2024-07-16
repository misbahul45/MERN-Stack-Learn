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
