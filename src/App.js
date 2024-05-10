import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Main from "./components/Main";
import Login from "./components/Login";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <Routes>
      <Route path="/" element={<Home isLoggedIn/>} />

      <Route path="/login" element={isLoggedIn ? <Main/> :  <Login setIsLoggedIn={setIsLoggedIn}/>} />
    </Routes>
  )
}

export default App;
