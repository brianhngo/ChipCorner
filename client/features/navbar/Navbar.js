import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import AppRoutes from '../../app/AppRoutes';

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Welcome </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : null}
      </nav>

      <Link to="/cart">
        <div className="cart">
          <ShoppingCartTwoToneIcon />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
