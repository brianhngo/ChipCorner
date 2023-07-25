import React from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';

import { Routes, Route } from 'react-router-dom';
import FilterChips from './FilterChips';
import CreateNewUser from './CreateNewUser/CreateNewUser';
import SuccessPage from './SuccessPage';
import CartPage from './cart/CartPage';

import AdminAddChips from './AdminAddChips';
import AdminEditChips from './AdminEditChips';
import CheckoutPage from './cart/stripe/checkoutComp';

const App = () => {
  return (
    <Routes>
      <Route path='/payment' element={<CheckoutPage />} />
      <Route path='/allchips' element={<FilterChips />} />
      <Route path='/chips/:id' element={<SingleProduct />} />
      <Route path='/signup' element={<CreateNewUser />} />
      <Route path='/successPage' element={<SuccessPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/addchips' element={<AdminAddChips />} />
      <Route path='/editchips' element={<AdminEditChips />} />
      <Route path='/' element={<LandingPage />} />
    </Routes>
  );
};

export default App;
