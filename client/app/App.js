import React from "react";
import LandingPage from "./LandingPage";
import SingleProduct from "./SingleProduct";
import CartPage from "./cart/CartPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/chips/:id" element={<SingleProduct />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default App;
