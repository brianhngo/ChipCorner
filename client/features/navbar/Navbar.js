import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import AppRoutes from '../../app/AppRoutes';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <section id="headerSection">
      <header id="headerContainer">
        <div id="websiteTitle">
          <h3>The Chip Corner</h3>
          <img
            className="logoImage"
            src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
          />
        </div>
        <nav id="navContainer">
          <Link to="/"> Home </Link>
          <Link to="/allchips"> All Chips </Link>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          <AppRoutes />
          <div className="cart">CART</div>
        </nav>
      </header>
    </section>
  );
};

export default Navbar;
