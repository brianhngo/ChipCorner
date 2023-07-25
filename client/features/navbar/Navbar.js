import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import AppRoutes from '../../app/AppRoutes';

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='SignedInComponent'>
      <nav>
        {isLoggedIn ? (
          <div className='SignedInComponent2'>
            {/* The navbar will show these links after you log in */}
            <h2>Welcome, {username}</h2>
            <button
              id='productContainersss'
              type='button'
              onClick={logoutAndRedirectHome}
            >
              Logout
            </button>
          </div>
        ) : null}
      </nav>

      <Link to='/cart'>
        <div className='cart'>
          <ShoppingCartTwoToneIcon />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
