import React, { useReducer, useRef, useState } from 'react';
import './newPassword.css';
import makeHTTP from '../utils/httpRequest';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';
import MessageModal from '../common/MessageModal';


const initialState = {
    isValidOTP: false,
    isValidPassword: false,    
    isValidConfirmPassword: false    
};
  
const reducer = (state, action) => { 
    console.log('at reducer ')
    switch(action.type) { 
        case 'OTP' :         
            return {...state, isValidOTP: action.isValid} ; 
        case 'PASSWORD' : 
            return {...state, isValidPassword: action.isValid}
        case 'CONFIRM_PASSWORD' : 
            return {...state, isValidConfirmPassword: action.isValid}
        default : 
        return state
    }
}


const NewPassword = () => {
    const [state, dispatch] = useReducer(reducer, initialState) ; 
    const otpRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)    
    const [modalMessage, setModalMessage] = useState(false)
    const navigate = useNavigate()
    
    const isValidForm = state.isValidOTP && state.isValidPassword && state.isValidConfirmPassword
    console.log(state)

    const changePasswordHandler = async (event)=> { 
        event.preventDefault()
        event.target.querySelector('.btn').blur();
        

        console.log('Sending http request with new password ... ')        
        setIsLoading(true)
        
        const response = await makeHTTP('/password', {
            method: 'UPDATE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: localStorage.getItem('email'),
              newPassword : passwordRef.current.value,
              otp : otpRef.current.value,
            }),
        })
        setIsLoading(false)
        console.log(response.status)
        
        if ( !response.ok) {             
            setModalMessage('Error Accrued Please Try Again')
            return
        }                
        setModalMessage('Password Updated Successfully')
        setTimeout(()=>{
            navigate('/login')
        }, 3000)
        
    }

    const otpChangeHandler = ()=> {         
        dispatch({type:'OTP', isValid: otpRef.current.value.length === 6})
    }
    const passwordChangeHandler = ()=> { 
        dispatch({type:'PASSWORD', isValid: passwordRef.current.value .length >= 8 })
    }
    const confirmPasswordChangeHandler = ()=> { 
        dispatch({type:'CONFIRM_PASSWORD', isValid: confirmPasswordRef.current.value === passwordRef.current.value })
    }
    
    const cancelModalHandler = ()=> { 
        setModalMessage(false)
    }
    
    return (
        <div className="container">
                 {isLoading && <Loading />}
                <form onSubmit={ changePasswordHandler} className="form-container">
                    <h2>New Password</h2>
                    <div className="form-group">                       
                     <input
                            autoComplete='one-time-code'
                            ref={otpRef}
                            placeholder='OTP'
                            type="number"                                                      
                            onChange={otpChangeHandler}
                            required
                            className={ !state.isValidOTP ? 'invalid' : ''}
                        />
                    <input
                            autoComplete='password'
                            placeholder='New Password'
                            type="password"                                                      
                            onChange={passwordChangeHandler}
                            required
                            ref={passwordRef}
                            className={!state.isValidPassword ? 'invalid': ''}

                        />
                        <input
                            autoComplete='password'
                            ref={confirmPasswordRef}
                            placeholder='Confirm New Password'
                            type="password"                                                      
                            onChange={confirmPasswordChangeHandler}
                            required
                            className={!state.isValidConfirmPassword ? 'invalid' : ''}
                        />
                    </div>
                    <button type='submit' className="btn" disabled={!isValidForm}>Send OTP</button>
                </form>
                
             {
                modalMessage && 
                <MessageModal message={modalMessage} onCancel={cancelModalHandler}/>

             }
            
        </div>
    );
};

export default NewPassword;
