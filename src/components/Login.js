import React, {useState,  useEffect, useReducer, useRef } from 'react';
import './login.css'; 
import { useAuthAppContext } from '../AuthenticationContextProvider';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../common/Loading';
import makeHTTP from '../utils/httpRequest';
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

function Login() {
    const { isLoggedIn, setIsLoggedIn}  = useAuthAppContext()
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false)

    const userNameRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate()

    useEffect(()=>{
        if (isLoggedIn){
            navigate('/')
        }
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
        setIsLoading(true)   
        loginUser(userNameRef.current.value, passwordRef.current.value).then(response =>  { 
            console.log(response.headers)
            if ( !response.ok) { 
                console.log('Wrong Email or Password')
            }
            else { 
                console.log('Correct Credentials')
                setIsLoggedIn(true)
                navigate('/main')                
            }
            console.log('dismissing the backlog')
            // Show Wrong Email or Password
            setIsLoading(false)
            
        }).catch(error=>{
            console.log('Sending HTTP Error: ', error)
        })
        
        // show loading bar 
        // if 200 : go to user area else show error message

    };
    const loginUser = (username, password) => {        
        const data = {
            email: username,
            password: password
        };
    
        const options  = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), 
            credentials : 'include'
            
        }
        return makeHTTP('/login', options)        

    }
    
    
    const backClickHandler = ()=> { 
        navigate('/')
    }

    return (
        <div className="login-container">
            {/* Loading */}
            {isLoading ? <Loading/> : ''}
            {/*  */}
        
            <FontAwesomeIcon onClick={backClickHandler} className='arrow' icon={faArrowLeft} />
            <h2>Welcome Back</h2>

            <form>
                <div>
                    <input
                        placeholder='Email'
                        type="text"
                        autoComplete='username'
                        onBlur={userNameOnBlurHandler}
                        ref={userNameRef}
                        className={!state.isValidUserName ? 'invalid' : ''}
                    />
                </div>
                <div>
                    
                    <input
                        placeholder='Password'
                        type="password"
                        autoComplete='current-password'
                        
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
