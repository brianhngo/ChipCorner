import React, { useState, useEffect } from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getChipDataList } from './LandingPageSlice';

const App = () => {
  const chipsDataList = useSelector((state) => state.landingPage.chipsInfo);
  const dispatch = useDispatch();
  console.log(chipsDataList);
  useEffect(() => {
    dispatch(getChipDataList());
  }, []);

  return (
    <div id="container">
      <section id="headerSection">
        <header id="headerContainer">
          <div id="websiteTitle">
            <h3>The Chip Corner</h3>
            <div className="logo">PlaceHolder for Logo</div>
          </div>
          <nav id="navContainer">
            <Navbar />
            <AppRoutes />
            <div className="cart">CART</div>
          </nav>
        </header>
      </section>
      <section id="panelContainerSection">
        <div className="imagePlaceholder">Image PlaceHolder</div>
        <div id="productContainer">
          <h4>Product Description</h4>
          <button>Click on me to this product's Link</button>
        </div>
      </section>
      <section id="aboutUsPageSection">
        <h2>About Us Page</h2>
        <div>Text about us</div>
      </section>

      <section id="featuredProductsSection">
        <h2>Featured Products</h2>

        <div id="FeatureProductsContainers">
          {chipsDataList.map((element) => {
            return (
              <div className="ProductsContainer" key={element.id}>
                <div className="productImage">
                  <img className="productImage2" src={element.imageUrl} />
                </div>
                <p> {element.title}</p>
                <button> Click Here! </button>
              </div>
            );
          })}
        </div>
      </section>
      <section id="newsletterSection">
        <form>
          <div id="newsLetterContainer">
            <label>Newsletter</label>
            <input type="email" placeholder="Enter your email"></input>
            <button>Subscribe</button>
          </div>
        </form>
      </section>

      <section id="footerSection">
        <p> © Copyright 2023 </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default App;
