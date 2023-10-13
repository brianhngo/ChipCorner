import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../store.js';
import { FaBars, FaTimes } from 'react-icons/fa';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import LoginModal from '../CreateNewUser/LoginModal.js';
import { me, checkAdminStatus } from '../../features/auth/authSlice.js';
import './Navbar.css';
import { resetUserInfo } from '../MyProfile/ProfileSlice.js';
import { removeBookmark } from '../LandingPage/LandingPageSlice.js';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const username = useSelector((state) => state.auth.me.username);

  const number = useSelector((state) => state.order.quantityAmount);
  console.log(number);
  const [numberState, setNumberState] = useState(
    JSON.parse(window.localStorage.getItem('cartNumber'))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    setIsPopupOpen(false);
    dispatch(resetUserInfo());
    dispatch(removeBookmark());
    navigate('/');
  };

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const [cartQuantity, setCartQuantity] = useState(0);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    dispatch(me());
    dispatch(checkAdminStatus());
  }, []);

  useEffect(() => {
    dispatch(checkAdminStatus());
  }, [dispatch]);

  useEffect(() => {}, [numberState]);

  return (
    <header>
      <NavLink className="navLink" to="/">
        <img src="logo.png" class="logo" />
      </NavLink>
      <nav className="navContainer" ref={navRef}>
        <NavLink to="/" className="navLink">
          {' '}
          Home{' '}
        </NavLink>
        <NavLink to="/allproducts" className="navLink">
          {' '}
          All Products{' '}
        </NavLink>
        {/* <NavLink to="/about" className="navLink">
          {' '}
          About Us{' '}
        </NavLink>
        <NavLink to="/contact" className="navLink">
          {' '}
          Contact{' '}
        </NavLink> */}
        <NavLink to="/bookmarks" className="navLink">
          {' '}
          Bookmarks{' '}
        </NavLink>
        {isAdmin === true ? (
          <NavLink to="/Admin" className="navLink">
            {' '}
            Admin{' '}
          </NavLink>
        ) : null}

        {isLoggedIn === false ? (
          <>
            <a href="#" onClick={openPopup}>
              Sign In
            </a>
            {isPopupOpen === true ? (
              <LoginModal isOpen={isPopupOpen} onClose={closePopup} />
            ) : null}
          </>
        ) : (
          <>
            <div className="SignedInComponent2">
              <h2>Welcome, {username}</h2>
              <NavLink to="/profile" className="navLink">
                {' '}
                My Profile{' '}
              </NavLink>
              <button
                id="productContainersss"
                type="button"
                onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </div>
          </>
        )}

        <button type="button" className="cart-icon">
          <NavLink to="/cart" className="navLink">
            <ShoppingCartTwoToneIcon />
            <span className="cart-item-qty">{number}</span>
          </NavLink>
        </button>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
