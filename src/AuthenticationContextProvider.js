// AppContext.js
import React, { useEffect,  createContext, useContext, useState } from 'react';

// Create a context
const AppContext = createContext({
    isLoggedIn : false, 
    setIsLoggedIn : ()=>{}
});

// Create a Provider component
export const AuthenticationContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return Boolean( parseInt(localStorage.getItem('isLoggedIn'))) || false
  });
  
  useEffect(() => {
    // Save isLoggedIn to localStorage whenever it changes
    localStorage.setItem('isLoggedIn', +isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AppContext.Provider value={{ 
        isLoggedIn,
         setIsLoggedIn }}>

      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAuthAppContext = () => useContext(AppContext);  
