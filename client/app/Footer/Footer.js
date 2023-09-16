import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="col-1">
        <h3>Links</h3>
        <div className = 'col-1-links'>
        <Link to="/">Home</Link>
        <Link to="/chips">All Chips</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/terms">Terms</Link>
        </div>
      </div>
      <div className="col-2">
        <h3>NEWSLETTER</h3>
        <form>
          <input type="email" id ='subscribeInput' placeholder="Your Email Address" required/>
          <br/>
          <button id = 'subscribeButton' type="submit">Subscribe Now</button>
        </form>
      </div>
  <div className="col-3">
  <h3>Email</h3>
  <p style={{ margin: '1rem' }}>chipcorner@gmail.com</p>

     <h3>Address</h3>
  <p style={{ margin: '1rem' }}>
    123 Main Street <br />
    Hogwarts, Harry Potter
  </p>

  <h3>Social Media</h3>
  <div className="social-icons" style={{ margin: '1rem' }}>
    <i className="fab fa-facebook"> </i>
    <i className="fab fa-twitter"> </i>
    <i className="fab fa-instagram"> </i>
    <i className="fab fa-snapchat"> </i>
  </div>
</div>
    </div>
  );
}
