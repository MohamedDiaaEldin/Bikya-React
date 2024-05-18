import React, { useState } from 'react';
import './forgotPassword.css';
import makeHTTP from '../utils/httpRequest';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';
import MessageModal from '../common/MessageModal';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');    
    const [isLoading, setIsLoading] = useState(false)
    const [isValidEmail, setIsValidEmail]  = useState(false)
    const [modalMessage, setModalMessage] = useState(false)
    const navigate = useNavigate()
    
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(pattern.test(email)) ;
    };
   
    const sendOTPHandler = async (event)=> { 
        event.preventDefault()
        event.target.querySelector('.btn').blur();


        console.log('Sending OTP ... ')
        setIsLoading(true)
        const response = await makeHTTP('/otp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
        })
        setIsLoading(false)
        console.log(response.status)
        
        if (response.status === 500) {             
            setModalMessage('Error Accrued Please Try Again')
            return
        }                
        navigate('/new-password')
        
    }
    const cancelModalHandler = ()=> { 
        setModalMessage(false)
    }
    console.log('loaded')
    return (
        <div className="forgot-password-container">
                 {isLoading && <Loading />}
                <form onSubmit={ sendOTPHandler} className="forgot-password-form">
                    <h2>Forgot Password</h2>
                    <div className="form-group">                        <input
                            placeholder='Email'
                            type="email"                                                      
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type='submit' className="btn" disabled={!isValidEmail}>Send OTP</button>
                </form>
                
             {
                modalMessage && 
                <MessageModal message={modalMessage} onCancel={cancelModalHandler}/>

             }
            
        </div>
    );
};

export default ForgotPassword;
