import React from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';

import { Routes, Route } from 'react-router-dom';
import FilterChips from './FilterChips';
import CreateNewUser from './CreateNewUser';
import SuccessPage from './SuccessPage';
import CartPage from './cart/CartPage';

const App = () => {
  return (
    <Routes>
      <Route path='/allchips' element={<FilterChips />} />
      <Route path='/chips/:id' element={<SingleProduct />} />
      <Route path='/signup' element={<CreateNewUser />} />
      <Route path='/successPage' element={<SuccessPage />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  );
};

export default App;
