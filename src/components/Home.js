import Header from '../components/Header'
import Landing from '../components/Landing';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Footer from '../components/Footer';
import { useAuthAppContext } from '../AuthenticationContextProvider';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function Home() {
  const {isLoggedIn} = useAuthAppContext()
  const navigate = useNavigate()


  useEffect(()=> { 
    if(isLoggedIn){
        navigate('/main')
    }
}, [])
  return (
    
    <>
      <Header />
      <Landing/>
      <HowItWorks/>
      <About/>
      <Footer/>
    </>
  )
}

export default Home