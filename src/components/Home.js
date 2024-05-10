import Header from '../components/Header'
import Landing from '../components/Landing';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Footer from '../components/Footer';

function Home({isLoggedIn}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <Landing/>
      <HowItWorks/>
      <About/>
      <Footer/>
    </>
  )
}

export default Home