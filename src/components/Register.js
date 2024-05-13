import React, { useState, useEffect, useReducer, useRef } from 'react';
import './register.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import makeHTTP from '../utils/httpRequest';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';

const initialState = {
  isValidEmail: false,
  isValidPassword: false,
  isValidConfirmPassword: false,
  isValidPhone: false,
  isValidAddress: false,
};

const reducer = (state, action) => {
  switch (action.type) {
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRef = useRef('');
  
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const phoneRef = useRef('');
  const addressRef = useRef('');

  useEffect(() => {
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
        throw new Error('Sending OTP failed');
      }
      setError('');
      console.log('OTP sent successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError('Sending OTP failed. Please try again.');
      setIsLoading(false);
    }
  };

  const backClickHandler = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      {isLoading && <Loading />}
      <FontAwesomeIcon onClick={backClickHandler} className="arrow" icon={faArrowLeft} />
      <h2>Sign Up</h2>
      <form>
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
        {error && <p className="error-message">{error}</p>}
        <button className="login" disabled={!isValidForm} type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Rejecter;
