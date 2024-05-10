import React, { useReducer, useRef } from 'react';
import './login.css'; 

const initialState = {
    isValidPassword: false,
    isValidUserName: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'USERNAME':
            
            console.log('payload', action.payload)
            return { ...state, isValidUserName: action.isValid };
        case 'PASSWORD':
            return { ...state, isValidPassword: action.isValid };
        default:
            return state;
    }
};

function Login() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const userNameRef = useRef('');
    const passwordRef = useRef('');



    const isValidForm = state.isValidPassword && state.isValidUserName

    const userNameOnBlurHandler = () => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        dispatch({ type: 'USERNAME', isValid: pattern.test(userNameRef.current.value) });
    };

    const passwordOnBlurHandler = () => {
        dispatch({ type: 'PASSWORD', isValid: passwordRef.current.value.trim().length > 0 });
    };

    const handleLogin = () => {
        // send make http request 
        // show loading bar 
        // if 200 : go to user area else show error message
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        onBlur={userNameOnBlurHandler}
                        ref={userNameRef}
                        className={!state.isValidUserName ? 'invalid' : ''}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        ref={passwordRef}
                        className={!state.isValidPassword ? 'invalid' : ''}
                        onBlur={passwordOnBlurHandler}
                    />
                </div>
                <button disabled={!isValidForm} type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;
