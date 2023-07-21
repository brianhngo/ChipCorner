import React, { useEffect } from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/chips/:id" element={<SingleProduct />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
