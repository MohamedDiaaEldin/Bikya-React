import React, { useRef, useState } from 'react';
import './message.css';

const Message = ({ text, onClick, onCancel, isValidOTP }) => {
    const otpRef = useRef(null)
    

    console.log('At Message Component ')
    
    const handleSubmit = ()=> { 
        onClick(otpRef.current.value)
    }

    return (
        <div className={'message'}>
            
            <p >{text}</p>         
                <div className='up'>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        ref={otpRef}                                                
                    />
                    <p className={isValidOTP ? 'none' : 'error'}>Invalid OTP</p>
                    <div className='btns-container'>
                        <button onClick={handleSubmit} className="submit" type="submit">Submit</button>
                        <button onClick={onCancel} className="cancel" >Cancel</button>
                    </div>
                </div>
            
        </div>
    );
};

export default Message;

