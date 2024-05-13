import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import Login from "./components/Login";
import Rejecter from "./components/Register";
import { AuthenticationContextProvider, useAuthAppContext } from "./AuthenticationContextProvider";
import { useState } from "react";
// 

function App() {
  const {isLoggedIn} = useAuthAppContext()
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <AuthenticationContextProvider>
      <Routes>
        <Route path="/" element={<Home/>} />        
        <Route path="/login" element={<Login/>}/>
        <Route path='/main' element={<Main/>} />
        <Route path='/rejecter' element={<Rejecter/>} />

      </Routes>
      
    </AuthenticationContextProvider>
  

    
  )
}

export default App;
