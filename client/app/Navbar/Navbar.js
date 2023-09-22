import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store.js';
import { FaBars, FaTimes } from 'react-icons/fa';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import LoginModal from '../CreateNewUser/LoginModal.js';
import { me } from '../../features/auth/authSlice.js';
import './Navbar.css';
import { resetUserInfo } from '../MyProfile/ProfileSlice.js';
import { removeBookmark } from '../LandingPage/LandingPageSlice.js';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const username = useSelector((state) => state.auth.me.username);

  const number = useSelector((state) => state.order.quantityAmount);
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
  }, []);

  useEffect(() => {}, [numberState]);

  return (
    <header>
      <Link to="/">
        <img src="logo.png" class="logo" />
      </Link>
      <nav className="navContainer" ref={navRef}>
        <Link to="/"> Home </Link>
        <Link to="/allchips"> All Products </Link>
        <Link to="/about"> About Us </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/bookmarks"> Bookmarks </Link>

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
              <Link to="/profile"> My Profile </Link>
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
          <Link to="/cart">
            <ShoppingCartTwoToneIcon />
            <span className="cart-item-qty">{number}</span>
          </Link>
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
