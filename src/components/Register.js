import React, { useState, useEffect, useReducer, useRef } from 'react';
import './register.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import makeHTTP from '../utils/httpRequest';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import MessageModal from '../common/MessageModal';
import Overlay from '../common/Overlay';


const initialState = {
  isValidName: false,
  isValidEmail: false,
  isValidPassword: false,
  isValidConfirmPassword: false,
  isValidPhone: false,
  isValidAddress: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NAME':
      return { ...state, isValidName: action.isValid };
    case 'EMAIL':
      return { ...state, isValidEmail: action.isValid };
    case 'PASSWORD':
      return { ...state, isValidPassword: action.isValid };
    case 'CONFIRM_PASSWORD':
      return { ...state, isValidConfirmPassword: action.isValid };
    case 'PHONE':
      return { ...state, isValidPhone: action.isValid };
    case 'ADDRESS':
      return { ...state, isValidAddress: action.isValid };
    default:
      return state;
  }
};

const Rejecter = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  // 
  const navigate = useNavigate();
  // 
  const nameRef = useRef('');  
  const emailRef = useRef('');  
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const phoneRef = useRef('');
  const addressRef = useRef('');
  // 
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isValidOTP , setIsValidOTP]  = useState(true)
  // Simple Message Modal State
  const [showMessageModal, setShowMessageModal] = useState(false) ;
  let [modelMessage, setModelMessage] = useState(false)
  useEffect(() => {

    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedAddress = localStorage.getItem('address');
    const savedPhone = localStorage.getItem('phone');

    if (savedName) nameRef.current.value = savedName;
    if (savedEmail) emailRef.current.value = savedEmail;
    if (savedPassword) passwordRef.current.value = savedPassword;
    if (savedAddress) addressRef.current.value = savedAddress;
    if (savedPhone) phoneRef.current.value = savedPhone;


    console.log('useEffect')
        // Delay validation by 500 milliseconds after component mounts
        const delay = setTimeout(() => {
          console.log('timeout')
          emailOnBlurHandler(); // Assuming you have a function to handle email validation onBlur
          phoneOnBlurHandler()
        }, 4500); // Adjust the delay as needed
    
        // Cleanup function to clear the timeout when the component unmounts
        return () => {
          clearTimeout(delay)          
          console.log('cleared')
        };
  }, []);

    const isValidForm =
    state.isValidName &&
    state.isValidEmail &&
    state.isValidPassword &&
    state.isValidConfirmPassword &&
    state.isValidPhone &&
    state.isValidAddress;

  const emailOnBlurHandler = () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    dispatch({ type: 'EMAIL', isValid: pattern.test(emailRef.current.value) });
  };

  const passwordOnBlurHandler = () => {
    dispatch({ type: 'PASSWORD', isValid: passwordRef.current.value.trim().length > 0 });
  };

  const confirmPasswordOnBlurHandler = () => {
    dispatch({ type: 'CONFIRM_PASSWORD', isValid: confirmPasswordRef.current.value === passwordRef.current.value });
  };

  const phoneOnBlurHandler = () => {
    const pattern = /^(?:\+?20|0)?(\d{10})$/;
    console.log(pattern.test(phoneRef.current.value))
    dispatch({ type: 'PHONE', isValid: pattern.test(phoneRef.current.value) });
  };

  const addressOnBlurHandler = () => {
    dispatch({ type: 'ADDRESS', isValid: addressRef.current.value.trim().length > 0 });
  };

  const nameOnBlurHandler = () => {
    dispatch({ type: 'NAME', isValid: nameRef.current.value.trim().length > 0 });
  };

  
  const handleSignup = async () => {
    setIsLoading(true);
    
    try {
      const response = await makeHTTP('/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      });
      if (!response.ok) {
        console.log("response.status : ", response.status)
        if(response.status === 409){
          setModelMessage('Email is registered, Try to login')          
        }
        else{
          setModelMessage('Sending OTP failed, Please Try Again' )
        }        
        setIsLoading(false)
        return
      }
      
      // save in local storage
      localStorage.setItem('name', nameRef.current.value);
      localStorage.setItem('email', emailRef.current.value);
      localStorage.setItem('password', passwordRef.current.value);
      localStorage.setItem('address', addressRef.current.value);
      localStorage.setItem('phone', phoneRef.current.value);
        
      setIsLoading(false);
      setShowOtpInput(true)
    } catch (error) {
      console.error('Error:', error.message);
      // setError('Sending OTP failed. Please try again.');
      setShowMessageModal('Sending OTP failed. Please try again.')
      setIsLoading(false);
    }
  };


  // 
  const handleOtpSubmit = async (otp) => {
    setIsLoading(true)
    if (otp.length !== 6){
      setIsValidOTP(false)
      return 
    }

    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: addressRef.current.value,
      mobile: addressRef.current.value,
      otp: otp
    }
    console.log(body)
    const response = await makeHTTP('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      console.log("response.status : ", response.status)
      if(response.status === 409){
        setModelMessage('Email is registered, Try to login')          
      }
      else if (response.status === 401){
        setShowMessageModal('Invalid OTP')
      }
      else{
        setModelMessage('Sending OTP failed, Please Try Again' )
      }        
      
      setIsValidOTP(false)      
      setIsLoading(false)
      
      return
    }
      
    // console.log('response.status ', response.status)
     /// ok , registered
     setShowOtpInput(false)
     console.log('close loading ')
     setIsLoading(false)
     console.log('Showing Success Message')
     setModelMessage('Account created successfully')

     setTimeout(()=>{
        navigate('/login')

     }, 3000)
    
    
};

const handleCancelMessage = ()=>{
  setShowOtpInput(false)
}

  const backClickHandler = () => {
    navigate('/login');
  };

  console.log('modelMessage : ', modelMessage)

  const cancelMessageModal = ()=> { 
    setModelMessage(false)
  }
  return (
    <div className="signup-container">
      {isLoading && <Loading />}
      <FontAwesomeIcon onClick={backClickHandler} className="arrow" icon={faArrowLeft} />
      <h2>Sign Up</h2>
      <form>
        <div>
          <input
          autoComplete='name'
            placeholder="Name"
            type="text"
            onBlur={nameOnBlurHandler}
            ref={nameRef}
            className={!state.isValidName ? 'invalid' : ''}
          />
        </div>        
        <div>
          <input
          autoComplete='email'
            placeholder="Email"
            type="email"
            onBlur={emailOnBlurHandler}
            ref={emailRef}
            className={!state.isValidEmail ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
          autoComplete='new-password'
            placeholder="Password"
            type="password"
            onBlur={passwordOnBlurHandler}
            ref={passwordRef}
            className={!state.isValidPassword ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
          autoComplete='new-password'
            placeholder="Confirm Password"
            type="password"
            onBlur={confirmPasswordOnBlurHandler}
            ref={confirmPasswordRef}
            className={!state.isValidConfirmPassword ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
          autoComplete='address-level1'
            placeholder="Address"
            type="text"
            onBlur={addressOnBlurHandler}
            ref={addressRef}
            className={!state.isValidAddress ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
          autoComplete='tel'
            placeholder="Phone Number"
            type="tel"
            onBlur={phoneOnBlurHandler}
            ref={phoneRef}
            className={!state.isValidPhone ? 'invalid' : ''}
          />
        </div>
        <button className="btn" disabled={!isValidForm} type="button" onClick={handleSignup}>
          Sign Up
        </button>

      </form>
        {showOtpInput && (
            <Overlay>
                <Message                    
                    text="An OTP has been sent to your email. Please enter it below."                 
                    onClick={handleOtpSubmit}         
                    onCancel={handleCancelMessage}   
                    isValidOTP={isValidOTP}        
                />
            </Overlay>
        )}
        {
          modelMessage && (
            <MessageModal message={modelMessage} onCancel={cancelMessageModal}/>
          )
        }
    </div>
  );
};

export default Rejecter;
