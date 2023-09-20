import React, { useState, useEffect } from 'react';
import { verifyUserInput, createNewUser } from './CreateNewUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { changeStatus } from './CreateNewUserSlice';
import AppRoutes from '../AppRoutes';
import Navbar from '../Navbar/Navbar.js';

export default function CreateNewUser({changeStatus}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const verifyStatus = useSelector((state) => state.createNewUser.verifyStatus);

  const createUserStatus = useSelector(
    (state) => state.createNewUser.createUserStatus
  );

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      verifyUserInput({
        username: username,
        email: email,
      })
    );
  };

  useEffect(() => {
    if (verifyStatus === false) {
      console.log('hi');
      dispatch(
        createNewUser({
          username: username,
          password: password,
          email: email,
        })
      );
    }
  }, [verifyStatus]);

  useEffect(() => {
    if (createUserStatus === true) {
      navigate('/');
      dispatch(changeStatus(null));
    }
  }, [createUserStatus]);

  return (
  
        <div className="createNewUserContainer">
          <form onSubmit={submitHandler} className="login-form">
            <div className = 'group'>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={userNameHandler}
              className={verifyStatus === true ? 'highlights' : null}></input>
              <span class="highlight"></span>
              <span class="bar"></span>
               <label>Username</label>
            </div>

            <div className = 'group'>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={passwordHandler}
              ></input>
              <span class="highlight"></span>
              <span class="bar"></span>
               <label>Password</label>
              </div>
            <div className = 'group'>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={emailHandler}
              className={verifyStatus === true ? 'highlights' : null}></input>
              <span class="highlight"></span>
              <span class="bar"></span>
               <label>Email</label>
            </div>

            <button className = 'submit-button'> Create User! </button>
          </form>
          {verifyStatus === true ? (
            <p className="error-message"> Email and Username has been used </p>
          ) : null}
          <a className = 'CreateNewUserLink' onClick = {changeStatus} > Back to Login</a>
        </div>

      

  );
}
