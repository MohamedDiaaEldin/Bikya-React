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
    if (
      emailRef.current.value.length > 0 ||
      passwordRef.current.value.length > 0 ||
      confirmPasswordRef.current.value.length > 0 ||
      phoneRef.current.value.length > 0 ||
      addressRef.current.value.length > 0
    ) {
      emailOnBlurHandler();
      passwordOnBlurHandler();
      confirmPasswordOnBlurHandler();
      phoneOnBlurHandler();
      addressOnBlurHandler();
    }
  }, [
    emailRef,
    passwordRef,
    confirmPasswordRef,
    phoneRef,
    addressRef,
  ]);

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
    const pattern = /^\d{11}$/;
    dispatch({ type: 'PHONE', isValid: pattern.test(phoneRef.current.value) });
  };

  const addressOnBlurHandler = () => {
    dispatch({ type: 'ADDRESS', isValid: addressRef.current.value.trim().length > 0 });
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await makeHTTP('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          phone: phoneRef.current.value,
          address: addressRef.current.value,
        }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      setError('');
      console.log('Signup successful');
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError('Signup failed. Please try again.');
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
            placeholder="Email"
            type="email"
            onBlur={emailOnBlurHandler}
            ref={emailRef}
            className={!state.isValidEmail ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            onBlur={passwordOnBlurHandler}
            ref={passwordRef}
            className={!state.isValidPassword ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            onBlur={confirmPasswordOnBlurHandler}
            ref={confirmPasswordRef}
            className={!state.isValidConfirmPassword ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
            placeholder="Address"
            type="text"
            onBlur={addressOnBlurHandler}
            ref={addressRef}
            className={!state.isValidAddress ? 'invalid' : ''}
          />
        </div>
        <div>
          <input
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
