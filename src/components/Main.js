import { useEffect } from "react"
import { useAuthAppContext } from "../AuthenticationContextProvider"
import { useNavigate } from "react-router-dom"
import './main.css'
import Header from "./Header"

const Main = () => { 
    const {isLoggedIn}  = useAuthAppContext()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/login')
        }
    })
    const getDataClickHandler = async ()=> { 
        const url = 'http://localhost:5000/data'; // Replace with your actual API endpoint
    
    
    
        const response =   await fetch(url, {
            method: 'GET', 
            credentials: 'include'
        })
        

        console.log({response})
    
    }
    return (
        <>        
            <Header/>
            <h3>user area</h3>
            <button onClick={getDataClickHandler}>Make Request</button>
        </>
    )
}

export default Main