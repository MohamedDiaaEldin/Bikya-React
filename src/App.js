import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import Login from "./components/Login";
import Rejecter from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";

import { AuthenticationContextProvider } from "./AuthenticationContextProvider";

// 

function App() {
  
  return (
    <AuthenticationContextProvider>
      <Routes>
        <Route path="/" element={<Home/>} />        
        <Route path="/login" element={<Login/>}/>
        <Route path='/main' element={<Main/>} />
        <Route path='/register' element={<Rejecter/>} />
        <Route path='/forget' element={<ForgotPassword/>} />
        <Route path='/new-password' element={<NewPassword/>} />

      </Routes>
      
    </AuthenticationContextProvider>
  

    
  )
}

export default App;
