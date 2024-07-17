import React, { createContext, useState } from "react";
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
  }
});

 export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const authenticated = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authenticated.user?.id ? true : false
  );
  const signIn=({ email, password }:loginUser)=>{
      setIsAuthenticated(true)
      authenticated.SignIn({ email, password })
  }

  const signOut = () => {
      authenticated.SignOut()
      setIsAuthenticated(false)
  }

  const updateUser=({id, user}:UpdateUser)=>{
    authenticated.updateUser({id, user})
    setIsAuthenticated(true)
  } 

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        updateUser,
        user:authenticated.user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

