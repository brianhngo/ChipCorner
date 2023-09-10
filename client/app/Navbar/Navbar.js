import React, {useRef, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store.js';
import AppRoutes from '../AppRoutes.js';
import {FaBars, FaTimes} from "react-icons/fa"
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

import './Navbar.css'

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
 
 
  const username = useSelector((state) => state.auth.me.username);

   const number = useSelector((state) => state.order.quantityAmount);
   const [numberState, setNumberState] = useState(JSON.parse(window.localStorage.getItem('cartNumber')))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/');
  };

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

 const [cartQuantity, setCartQuantity] = useState(0);



  useEffect(() => {
    
  }, [numberState]);

  return (
    <header>
        <Link to = '/'> 
          <img src = "logo.png" class = 'logo'/>
        </Link>
        <nav ref = {navRef}> 
          <Link to='/'> Home </Link>
          <Link to='/allchips'> All Products </Link>
          <Link to='/about'> About Us </Link>
          <Link to='/contact'> Contact </Link>
          <Link to='/signup'>Sign In</Link>
          <button type = 'button' className = 'cart-icon'>
             <Link to='/cart'>
                <ShoppingCartTwoToneIcon />
                <span className = "cart-item-qty" > 
                {
                   number
                }
                 </span>
              </Link> 
          </button>
          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className='nav-btn' onClick={showNavbar}>
          <FaBars />
        </button>
      
         {isLoggedIn && (
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
            )}
    </header>
  );
};

export default Navbar;
