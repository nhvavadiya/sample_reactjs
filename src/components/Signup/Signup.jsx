import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { ReactComponent as UsernameIcon } from '../../assets/username.svg';
import { ReactComponent as CloseEye } from '../../assets/close_eye.svg';
import { ReactComponent as OpenEye } from '../../assets/open_eye.svg';
import { ReactComponent as LockIcon } from '../../assets/password.svg';
import { ReactComponent as EmailIcon } from '../../assets/email.svg';
import GirlIcon from '../../assets/girl.svg';

import './Signup.css';

import { errorNotification, successNotification } from '../toast-notification/common-toast'

const Signup = (props) => {
    const { theme } = props;
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [confirmValues, setConfirmValues] = useState({
        confirmPassword: "",
        showConfirmPassword: false,
    });


    // For hide and show password
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
        setConfirmValues({ ...confirmValues, showConfirmPassword: false });
    };

    // For hide and show confirm password
    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showPassword: false });
        setConfirmValues({ ...confirmValues, showConfirmPassword: !confirmValues.showConfirmPassword });
    };

    // For take input of password
    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // For take input of confirm password
    const handleConfirmPasswordChange = (prop) => (event) => {
        setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    };

    // For validation and signup user
    const handleSignup = () => {
        if (validator.isEmpty(username)) {
            errorNotification('Please Enter Username.');
        }
        else if (validator.isEmpty(email)) {
            errorNotification('Please Enter Email Address.');
        }
        else if (!validator.isEmail(email)) {
            errorNotification('Please Enter valid Email Address.');
        }
        else if (validator.isEmpty(values.password)) {
            errorNotification('Please Enter Password.');
        }
        else if (!validator.isStrongPassword(values.password)) {
            errorNotification('Your Password is not Strong enough.');
        }
        else if (validator.isEmpty(confirmValues.confirmPassword)) {
            errorNotification('Please Enter Confirm Password.');
        }
        else if (!validator.equals(values.password, confirmValues.confirmPassword)) {
            errorNotification('Password and Confirm Password are must be same.');
        }
        else {
            //Signup API call here
            successNotification("You are Registered Successfully");
            navigate("/home");
        }
    }


    return (
        <section className='signup__section' data-theme={theme}>
            <div className='signup__container'>
                <div className='kanban__logo'>
                    <h3>KANBAN</h3>
                </div>
                <div className='login__title'>
                    <h4>Create an Account</h4>
                </div>
                <div className='username__section'>
                    <div>
                        <span>Username</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type='text' placeholder='Enter Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        <span className='username__icon'><UsernameIcon alt='user icon' /></span>
                    </div>
                </div>
                <div className='email__section'>
                    <div>
                        <span>Email address</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type='email' placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <span className='email__icon'><EmailIcon alt='email icon' /></span>
                    </div>
                </div>
                <div className='pwd__section'>
                    <div>
                        <span>Password</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type={values.showPassword ? "text" : "password"}
                            onChange={handlePasswordChange("password")}
                            value={values.password}
                            placeholder='Enter Password'
                        />
                        <span className='lock__icon'><LockIcon alt='lock icon' /></span>
                        <span className='eye__icons' onClick={handleClickShowPassword}>{values.showPassword ? <OpenEye alt='open-eye' /> : <CloseEye alt='close-eye' />}</span>
                    </div>
                </div>
                <div className='cpwd__section'>
                    <div>
                        <span>Confirm Password</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type={confirmValues.showConfirmPassword ? "text" : "password"}
                            onChange={handleConfirmPasswordChange("confirmPassword")}
                            value={confirmValues.confirmPassword}
                            placeholder='Enter Confirm Password'
                        />
                        <span className='lock__icon'><LockIcon alt='lock icon' /></span>
                        <span className='eye__icons' onClick={handleClickShowConfirmPassword}>{confirmValues.confirmPassword ? <OpenEye alt='open-eye' /> : <CloseEye alt='close-eye' />}</span>
                    </div>
                </div>
                <div className='login__button'>
                    <button onClick={handleSignup} >
                        Signup
                    </button>
                </div>
                {/* <div className='or__section'>
          <span className='before__line'></span>
          <span className='or__line'>or</span>
          <span className='after__line'></span>
        </div> */}
                {/* <div className="google__login">
          <button>
            <span className="google__icon">
              <img src={GoogleIcon} alt='google-icon' />
            </span>
            Continue with Google
          </button>
        </div> */}

                <div className='not__account'>
                    <span>Already have an account? </span> <Link to='/'> Login</Link>
                </div>
            </div>
            <div className='right__container'>
                <img src={GirlIcon} alt='girl-icon' />
            </div>
        </section>
    )
}

export default Signup