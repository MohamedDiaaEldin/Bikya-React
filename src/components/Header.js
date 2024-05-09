
import './header.css'
import logoImage  from '../images/logo.png'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ()=> {
    const [activeTab, setActiveTab] = useState('home')

    // console.log('Component is loaded')

    const linksClickHandler = (itemID)=> { 
        setActiveTab(itemID)
    }

    return (
        < header >
        <div className='container'>
            <a href="#" className="logo">
                <img src={logoImage} alt="logo"/> 
            </a>
            <nav>
                <FontAwesomeIcon className='menu-icon'  icon={faBars} />

                <ul className='display-menu' >
                    <li><a  onClick={()=> linksClickHandler('home')} className={activeTab ==='home' ? "active" : ""} href="#">Home</a></li>
                    <li><a onClick={()=> linksClickHandler('how-it-works')} className={activeTab ==='how-it-works' ? "active" : ""} href="#howItWorks">How It Works</a></li>
                    <li><a onClick={()=> linksClickHandler('about')} className={activeTab ==='about' ? "active" : ""} href="#about">About</a></li>
                    <li><a onClick={()=> linksClickHandler('contact')} className={activeTab ==='contact' ? "active" : ""} href="#footer">Contact</a></li>
                    <li><a href="/login"  className='login-btn'>Login</a> </li>
                    
                </ul>                
            </nav>   
        </div>
        </header>
    )
}


export default Header