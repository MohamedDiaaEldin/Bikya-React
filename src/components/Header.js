
import './header.css'
import logoImage  from '../images/logo.png'
import {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuthAppContext } from '../AuthenticationContextProvider';
import { useNavigate } from 'react-router-dom';

const Header = ()=> {
    const [activeTab, setActiveTab] = useState('home')
    const {isLoggedIn, setIsLoggedIn} = useAuthAppContext()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigate = useNavigate()

    const linksClickHandler = (itemID)=> { 
        setActiveTab(itemID)
    }
    const authClickHandler = ()=>{
        if (isLoggedIn){
            setIsLoggedIn(false)
            navigate('/')
        }
        else{
            navigate('/login')
        }
    }
    const navClickHandler = ()=> {

        setIsMenuOpen(!isMenuOpen)
    }
    return (
        < header >
        <div className='container'>
            <a href="#" className="logo">
                <img src={logoImage} alt="logo"/> 
            </a>

            <nav  >
                <FontAwesomeIcon onClick={navClickHandler} className='menu-icon'  icon={faBars} />

                <ul className={ isMenuOpen ? 'display-menu-mobile' : ''  +  'display-menu'}  >
                    
                    {isLoggedIn ? '' : <li><a  onClick={()=> linksClickHandler('home')} className={activeTab ==='home' ? "active" : ""} href="#">Home</a></li>}
                    {isLoggedIn ? '' :<li><a onClick={()=> linksClickHandler('how-it-works')} className={activeTab ==='how-it-works' ? "active" : ""} href="#howItWorks">How It Works</a></li>}
                    {isLoggedIn ? '' :<li><a onClick={()=> linksClickHandler('about')} className={activeTab ==='about' ? "active" : ""} href="#about">About</a></li>}
                    {isLoggedIn ? '' :<li><a onClick={()=> linksClickHandler('contact')} className={activeTab ==='contact' ? "active" : ""} href="#footer">Contact</a></li>}
                    {isLoggedIn ? '' :<li><a onClick={()=> linksClickHandler('contact')} className={activeTab ==='contact' ? "active" : ""} href="#footer">Contact</a></li>}
                    
                    {!isLoggedIn ? '' :<li><a  className='login-btn' href="/main">orders</a></li>}
                    <li onClick={authClickHandler}><a  className='login-btn'>{isLoggedIn? 'Logout' : 'Login'}</a> </li>  
                </ul>                
            </nav>   
        </div>
        </header>
    )
}


export default Header