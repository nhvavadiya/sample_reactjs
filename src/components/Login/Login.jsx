import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { ReactComponent as GoogleIcon } from '../../assets/google_login.svg';
import { ReactComponent as CloseEye } from '../../assets/close_eye.svg';
import { ReactComponent as OpenEye } from '../../assets/open_eye.svg';
import { ReactComponent as LockIcon } from '../../assets/password.svg';
import { ReactComponent as EmailIcon } from '../../assets/email.svg';
import GirlIcon from '../../assets/girl.svg';

import './Login.css';

import { errorNotification } from '../toast-notification/common-toast'

const Login = (props) => {
  const { theme } = props;
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // For hide and show password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // For take input of password
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // For validation and login user
  const handleLogin = () => {
    if (validator.isEmpty(email)) {
      errorNotification('Please Enter Email Address.');
    }
    else if (!validator.isEmail(email)) {
      errorNotification('Please Enter valid Email Address.');
    }
    else if (validator.isEmpty(values.password)) {
      errorNotification('Please Enter Password.');
    }
    else {
      //Login API call here
      navigate("/home");
    }
  }


  return (
    <section className='login__section' data-theme={theme}>
      <div className='login__container'>
        <div className='kanban__logo'>
          <h3>KANBAN</h3>
        </div>
        <div className='login__title'>
          <h4>Login to Kanban</h4>
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
        <div className='login__button'>
          <button onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className='or__section'>
          <span className='before__line'></span>
          <span className='or__line'>or</span>
          <span className='after__line'></span>
        </div>
        <div className="google__login">
          <button>
            <span className="google__icon">
              <GoogleIcon alt='google-icon' />
            </span>
            Continue with Google
          </button>
        </div>

        <div className='not__account'>
          <span>Don't have an account? </span> <Link to='/signup'> Sign up</Link>
        </div>
      </div>
      <div className='right__container'>
        <img src={GirlIcon} alt='girl-icon' />
      </div>
    </section>
  )
}

export default Login