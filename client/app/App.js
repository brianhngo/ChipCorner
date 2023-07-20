import React from "react";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
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
          <div className="ProductsContainer">
            <div className="productImage">Chip1 Image</div>
            <button>Chips1 Button</button>
          </div>

          <div className="ProductsContainer">
            <div className="productImage">Chip2 Image</div>
            <button>Chips2 Button</button>
          </div>

          <div className="ProductsContainer">
            <div className="productImage">Chip3 Image</div>
            <button>Chips3 Button</button>
          </div>

          <div className="ProductsContainer">
            <div className="productImage">Chip4 Image</div>
            <button>Chips4 Button</button>
          </div>
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
