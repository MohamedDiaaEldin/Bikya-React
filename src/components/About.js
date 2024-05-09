import aboutImage from '../images/about.png'

import './about.css'

// About Section
const About = ()=> { 
    return ( 
        <div id='about'>
            <h2 className='heading'>About Us</h2>
            <div className='about'>
                <p>we are dedicated to addressing Egypt's waste management challenges by facilitating profitable solutions for both buyers and sellers. Our mission is to foster sustainable practices and create a circular economy that maximizes the value of recyclable materials</p>    
                <img src={aboutImage} alt="about image" />
            </div>
        </div>
    )
}

export default About

