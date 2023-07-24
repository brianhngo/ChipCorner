import React, { useState, useEffect } from 'react';
import { verifyUserInput, createNewUser } from './CreateNewUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { changeStatus } from './CreateNewUserSlice';
import AppRoutes from './AppRoutes';
import Navbar from '../features/navbar/Navbar';

export default function CreateNewUser() {
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
      navigate('/successPage');
      dispatch(changeStatus(null));
    }
  }, [createUserStatus]);

  return (
    <>
      <div id="container">
        <section id="headerSection">
          <header id="headerContainer">
            <div id="websiteTitle">
              <h3>All Chips</h3>
              <img
                className="logoImage"
                src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
              />
            </div>
            <nav id="navContainer">
              <Link to="/"> Home </Link>
              <Link to="/allchips"> All Chips </Link>
              <Link to="/signup">Sign Up</Link>
              <AppRoutes />
              <Navbar />
            </nav>
          </header>
        </section>
      </div>
      <div className="createNewUserContainer">
        <h1> Create New User</h1>
        <p> Please Enter Information to continue </p>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">
            <h4> Username :</h4>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={userNameHandler}
            className={verifyStatus === true ? 'highlights' : null}></input>

          <label htmlFor="password">
            <h4> Password : </h4>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={passwordHandler}></input>

          <label htmlFor="email">
            <h4> Email : </h4>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={emailHandler}
            className={verifyStatus === true ? 'highlights' : null}></input>
          <button> Create User! </button>
        </form>
        {verifyStatus === true ? (
          <p className="error-message"> Email and Username has been used </p>
        ) : null}
        <Link to="/"> Back to Home Page</Link>
      </div>
    </>
  );
}
