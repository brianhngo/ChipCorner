import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'transparent',
    border: 'none',
  },
};

import AuthForm from '../../features/auth/AuthForm.js';
import CreateNewUser from './CreateNewUser.js';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { exit } from '../store.js';

export default function LoginModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [createUserStatus, setCreateUserStatus] = useState(false);
  const exitHandler = (event) => {
    dispatch(exit());
    event.preventDefault();
    onClose();
  };

  // turning the state to true
  const onClickHandler = () => {
    setCreateUserStatus(true);
  };
  // turning the state false when user goes from create user back to login
  const onClickHandler2 = () => {
    setCreateUserStatus(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {createUserStatus === false ? (
        <div className="popup">
          <h1 className="popup-title">Login </h1>
          <button className="exit-button" onClick={exitHandler}>
            X
          </button>
          <AuthForm />
          <a className="CreateNewUserLink" onClick={onClickHandler}>
            {' '}
            Create New User{' '}
          </a>
        </div>
      ) : (
        <div className="popup">
          <h1 className="popup-title">Create New User </h1>
          <p> Please Enter Information to continue </p>
          <button className="exit-button" onClick={exitHandler}>
            X
          </button>
          <CreateNewUser changeStatus={onClickHandler2} />
        </div>
      )}
    </Modal>
  );
}
