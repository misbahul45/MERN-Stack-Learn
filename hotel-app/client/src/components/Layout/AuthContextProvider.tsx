import React, { createContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";



interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  updateUser:()=>{},
  user:{
    id:'',
    username:'',
    email:'',
    avatar:'',
    createdAt:''
  },
  isError:false,
  messageError:''
});

 export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const authenticated = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    if(authenticated.user?.id){
      setIsAuthenticated(true)
    }
  },[authenticated.user])
  const signIn=({ email, password }:loginUser)=>{
      authenticated.SignIn({ email, password })
  }

  const signOut = () => {
      authenticated.SignOut()
      setIsAuthenticated(false)
  }

  const updateUser=({id, user}:UpdateUser)=>{
    authenticated.updateUser({id, user})
  } 

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        updateUser,
        user:authenticated.user as User,
        isError:authenticated.isError,
        messageError:authenticated.messageError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

