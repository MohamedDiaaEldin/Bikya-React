
import './header.css'
import logoImage  from '../images/logo.png'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ()=> { 
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);        
    };
    return (
        < header >
        <div className='container'>
            <a href="#" className="logo">
                <img src={logoImage} alt="logo"/> 
            </a>
            <nav>
                <button onClick={toggleMenu} >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                  <ul>
                    <li><a className="active" href="#">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">About</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#Pricing">Pricing</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>                
            </nav>   
        </div>
        </header>
    )
}


export default Header