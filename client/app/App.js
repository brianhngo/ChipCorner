import React, { useEffect } from 'react';
import LandingPage from './LandingPage';
import SingleProduct from './SingleProduct';
import { Routes, Route, Link } from 'react-router-dom';
import FilteredChips from './FilterChips';

const App = () => {
  return (
    <Routes>
      <Route path="/chips/:id" element={<SingleProduct />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/allchips" element={<FilteredChips/>} />
    </Routes>
  );
};

export default App;

// HELLO
