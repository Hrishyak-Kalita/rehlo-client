import React, { createContext, useState, useContext, useEffect } from 'react';

import { getAuth } from 'firebase/auth';
// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mainUser,setMainUser]= useState(null)
  const authToken=getAuth();
  const proxy=import.meta.env.VITE_PROXY

  const sendToken=async()=>{
    try{

      await authToken().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    
        const data=  fetch(`${proxy}/auth/`)
      }).catch(function(error) {
        // Handle error
        console.log(error)
      });

    }catch(err){
      console.log(err)
    }
  }

  

  useEffect(() => {
    // Check if user is already logged in (e.g., check for a token in local storage)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const setUser=(email)=>{
    localStorage.setItem('authEmail', email);
    setMainUser(email)

  }

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setUser,mainUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 