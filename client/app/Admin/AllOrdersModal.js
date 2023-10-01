import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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

export default function AllOrdersModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const exitHandler = (event) => {
    dispatch(exit());
    event.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {/* {createUserStatus === false ? (
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
      )} */}
    </Modal>
  );
}
