import React, { useEffect, useReducer, useRef } from 'react';
import './login.css'; 

const initialState = {
    isValidPassword: false,
    isValidUserName: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'USERNAME':
            return { ...state, isValidUserName: action.isValid };
        case 'PASSWORD':
            return { ...state, isValidPassword: action.isValid };
        default:
            return state;
    }
};

function Login({setIsLoggedIn}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const userNameRef = useRef('');
    const passwordRef = useRef('');


    useEffect(()=>{
        console.log('in use effect')
        console.log(userNameRef.current.value)
        if (userNameRef.current.value.length > 0 || passwordRef.current.value.length > 0){
            console.log('Yes')
            userNameOnBlurHandler()
            passwordOnBlurHandler()
        }
    }, [userNameRef, passwordRef])


    const isValidForm = state.isValidPassword && state.isValidUserName

    const userNameOnBlurHandler = () => {
        console.log('email blured')
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        dispatch({ type: 'USERNAME', isValid: pattern.test(userNameRef.current.value) });
    };

    const passwordOnBlurHandler = () => {
        dispatch({ type: 'PASSWORD', isValid: passwordRef.current.value.trim().length > 0 });
    };

    const handleLogin = () => {
        console.log('Showing BackLog')
        const response  = loginUser(userNameRef.current.value, passwordRef.current.value).then(response =>  { 
            console.log('dismissing the backlog')
            if ( !response.ok) { 
                console.log('Wrong Email or Password')
            }
            else { 
                console.log('Correct Credentials')
                setIsLoggedIn(true)
            }
            
        }).catch(error=>{
            console.log('Sending HTTP Error: ', error)
        })
        
        // show loading bar 
        // if 200 : go to user area else show error message

    };
    const loginUser = (username, password) => {
        console.log('calling the server')
        const url = 'http://localhost:5000/login'; // Replace with your actual API endpoint
    
        const data = {
            email: username,
            password: password
        };
    
        const response =   fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        

        return response ; 
    }
    
    // // Example usage:
    // const username = 'exampleUser';
    // const password = 'examplePassword';
    
    

    return (
        <div className="login-container">
            <h2>Welcome Back</h2>
            <form>
                <div>
                    <input
                        placeholder='Email'
                        type="text"
                        onBlur={userNameOnBlurHandler}
                        ref={userNameRef}
                        className={!state.isValidUserName ? 'invalid' : ''}
                    />
                </div>
                <div>
                    
                    <input
                        placeholder='Password'
                        type="password"
                        ref={passwordRef}
                        className={!state.isValidPassword ? 'invalid' : ''}
                        onBlur={passwordOnBlurHandler}
                    />
                </div>
                
                
                <a className='forget-password' href="">Forget Password?</a>                
                
               
                <button className='login' disabled={!isValidForm} type="button" onClick={handleLogin}>Login</button>

                <div className='sign-up'>
                    <p>Don't have account ?</p>
                    <a href="/rejecter">sign up</a>
                </div>                
            </form>
        </div>
    );
}

export default Login;
