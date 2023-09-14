import React from 'react';
import LandingPage from './LandingPage/LandingPage';
import SingleProduct from './SingleProduct/SingleProduct.js';
import MyProfile from './MyProfile/MyProfile.js'
import { Routes, Route } from 'react-router-dom';
import FilterChips from './AllChips/FilterChips';
import CreateNewUser from './CreateNewUser/CreateNewUser';
import SuccessPage from './cart/stripe/SuccessPage';
import CartPage from './cart/CartPage';
import Footer from './Footer/Footer.js'
import AdminAddChips from './AdminAddChips';
import AdminEditChips from './AdminEditChips';
import CheckoutPage from './cart/stripe/checkoutComp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from './CreateNewUser/LoginModal.js'
import Navbar from './Navbar/Navbar.js'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/payment' element={<CheckoutPage />} />
      <Route path='/allchips' element={<FilterChips />} />
      <Route path='/chips/:id' element={<SingleProduct />} />
      <Route path='/signup' element={<LoginModal />} />
      <Route path='/successPage' element={<SuccessPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/addchips' element={<AdminAddChips />} />
      <Route path='/editchips' element={<AdminEditChips />} />
      <Route path='/success' element={<SuccessPage/>} />
      <Route path = '/profile' element = {<MyProfile/>}/>
      <Route path='/' element={<LandingPage />} />
    </Routes>
    <ToastContainer/>
    <Footer/>
    </>
  );
};

export default App;
