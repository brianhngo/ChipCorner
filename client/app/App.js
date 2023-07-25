import React from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';

import { Routes, Route } from 'react-router-dom';
import FilterChips from './FilterChips';
import CreateNewUser from './CreateNewUser';
import SuccessPage from './SuccessPage';
import CartPage from './cart/CartPage';
import AdminAddChips from './AdminAddChips';
import AdminEditChips from './AdminEditChips';

const App = () => {
  return (
    <Routes>
      <Route path='/allchips' element={<FilterChips />} />
      <Route path='/chips/:id' element={<SingleProduct />} />
      <Route path='/signup' element={<CreateNewUser />} />
      <Route path='/successPage' element={<SuccessPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='/addchips' element={<AdminAddChips/>}/>
      <Route path='/editchips' element={<AdminEditChips/>}/>
    </Routes>
  );
};

export default App;
