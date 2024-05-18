import React, {useState,  useEffect, useReducer, useRef } from 'react';
import './login.css'; 
import { useAuthAppContext } from '../AuthenticationContextProvider';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../common/Loading';
import makeHTTP from '../utils/httpRequest';
import MessageModal from '../common/MessageModal'

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
    const { isLoggedIn, setIsLoggedIn } = useAuthAppContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);

    const userNameRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();

    //
    const [messageModal, setMessageModal] = useState(false)
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const isValidForm = state.isValidPassword && state.isValidUserName;

    const handleUserNameBlur = () => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        dispatch({ type: 'USERNAME', isValid: pattern.test(userNameRef.current.value) });
    };

    const handlePasswordBlur = () => {
        dispatch({ type: 'PASSWORD', isValid: passwordRef.current.value.trim().length > 0 });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const username = userNameRef.current.value;
        const password = passwordRef.current.value;
        const data = { email: username, password };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };
        makeHTTP('/login', options)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401){
                        console.log('Wrong Email or Password, Please try again');
                        setMessageModal('Wrong Email or Password, Please try again')
                    }
                    else{
                        console.log('Wrong Email or Password, Please try again')
                        setMessageModal('Error Accrued, Please try again')
                    }
                } else {
                    console.log('Correct Credentials');
                    setIsLoggedIn(true);
                    navigate('/main');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Sending HTTP Error: ', error);
                setIsLoading(false);
            });
    };

    const backClickHandler = () => {
        navigate('/');
    };
    const cancelMessageModal = ()=> { 
        setMessageModal(false)
    }

    return (
        <div className="login-container">
            {isLoading && <Loading />}
            <FontAwesomeIcon onClick={backClickHandler} className='arrow' icon={faArrowLeft} />
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        placeholder='Email'
                        type="text"
                        autoComplete='username'
                        onBlur={handleUserNameBlur}
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
                        onBlur={handlePasswordBlur}
                    />
                </div>
                <a className='forget-password' href="/forget">Forget Password?</a>
                <button className='login' disabled={!isValidForm} type="submit">Login</button>
                <div className='sign-up'>
                    <p>Don't have account ?</p>
                    <a href="/register">sign up</a>
                </div>
            </form>

            {
          messageModal && (
            <MessageModal message={messageModal} onCancel={cancelMessageModal}/>
          )
        }
        </div>
    );
}

export default Login;
