import React, { useEffect } from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getChipDataList } from './LandingPageSlice';
import Carousel from './Carousel';

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
            <img
              className="logoImage"
              src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
            />
          </div>
          <nav id="navContainer">
            <Navbar />
            <AppRoutes />
            <div className="cart">CART</div>
          </nav>
        </header>
      </section>
      <section id="panelContainerSection">
        <Carousel />
      </section>
      <section id="aboutUsPageSection">
        <h2>About Us Page</h2>
        <p>
          {' '}
          Welcome to Chip Enthusiasts, your one-stop destination for all things
          chips! We are a passionate team of chip enthusiasts who share a common
          love for these crispy, flavorful delights. Our mission is simple: to
          spread the joy of eating chips to people around the world and make the
          experience of snacking on chips an unforgettable one!{' '}
        </p>
        <p>
          {' '}
          It all began with a group of friends who bonded over their mutual
          admiration for chips. We realized that chips are more than just a
          snack; they bring people together, ignite conversations, and create
          lasting memories. This realization inspired us to start the Chip
          Corner, a platform where chip lovers from all corners of the globe can
          indulge in their favorite crunchy treat and discover new and exciting
          flavors.
        </p>
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
            <label>Newsletter : </label>
            <input type="email" placeholder="Enter your email"></input>
            <button>Subscribe</button>
          </div>
        </form>
      </section>

      <section id="footerSection">
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default App;
