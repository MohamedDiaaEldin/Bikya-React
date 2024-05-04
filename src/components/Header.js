
import './header.css'
import logoImage  from '../images/logo.png'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ()=> { 
    const [isOpen, setIsOpen] = useState(false);

    console.log('Component is loaded')

    const toggleMenu = () => {
        console.log('clicked')
        setIsOpen(!isOpen);
    };
    return (
        < header >
        <div className='container'>
            <a href="#" className="logo">
                <img src={logoImage} alt="logo"/> 
            </a>
            <nav>
                <FontAwesomeIcon className='menu-icon' onClick={toggleMenu} icon={faBars} />

                <ul className={isOpen ?'display-menu':'' } >
                    <li><a className="active" href="#">Home</a></li>
                    <li><a href="#howItWorks">How It Works</a></li>
                    <li><a href="#portfolio">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#login"  className='login-btn'>Login</a> </li>
                    
                </ul>                
            </nav>   
        </div>
        </header>
    )
}


export default Header