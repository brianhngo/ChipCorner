import React from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';
import { Routes, Route } from 'react-router-dom';
import CreateNewUser from './CreateNewUser';
import SuccessPage from './SuccessPage';
// ADD ALL CHIPS COMPONENT IMPORT
import React, { useEffect } from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/chips/:id' element={<SingleProduct />} />
      <Route path='/signup' element={<CreateNewUser />} />
      <Route path='/successPage' element={<SuccessPage />} />
      <Route path='/' element={<LandingPage />} />
    </Routes>
  );
};

export default App;
