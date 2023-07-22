import React from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';

import { Routes, Route, Link } from 'react-router-dom';
import FilterChips from './FilterChips';
import CreateNewUser from './CreateNewUser';
import SuccessPage from './SuccessPage';


const App = () => {
  return (
    <Routes>
      <Route path = "/allchips" element = {<FilterChips/>}/> 
      <Route path="/chips/:id" element={<SingleProduct />} />
      <Route path="/signup" element={<CreateNewUser />} />
      <Route path="/successPage" element={<SuccessPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/allchips" element={<FilteredChips/>} />
    </Routes>
  );
};

export default App;
