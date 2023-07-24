import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import { getSingleChipData } from './LandingPageSlice';
import Navbar from '../features/navbar/Navbar';
import { changeOrder } from './cart/CartPageSlice';
import AppRoutes from './AppRoutes';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const singleChip = useSelector((state) => state.landingPage.singleChipInfo);

  const { id } = useParams();

  const {
    price,
    title,
    description,
    brand,
    size,
    baked,
    ingredients,
    imageUrl,
    nutritional,
  } = singleChip;

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      changeOrder({
        id: id,
      })
    );
  };

  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(singleChip));
  };

  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);

  return (
    <>
      <div id="container">
        <section id="headerSection">
          <header id="headerContainer">
            <div id="websiteTitle">
              <h3>All Chips</h3>
              <img
                className="logoImage"
                src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
              />
            </div>
            <nav id="navContainer">
              <Link to="/"> Home </Link>
              <Link to="/allchips"> All Chips </Link>
              <Link to="/signup">Sign Up</Link>
              <AppRoutes />
              <Navbar />
            </nav>
          </header>
        </section>
      </div>

      <section>
        <div>
          <h1 className="chip-brand">{brand}</h1>
        </div>
        <div>
          <section className="single-product-container">
            <div className="chip-img-container">
              <img className="img-single-chip" src={imageUrl} alt={title} />
            </div>
            <div className="info-container">
              <h1 className="chip-title">{title}</h1>
              <p className="chip-description">{description}</p>
              <h3 className="chip-ingredients">Ingredients: {ingredients}</h3>
              <h3 className="chip-size">Size: {size}oz</h3>
              <h3 className="chip-size">
                {baked ? 'Baked' : 'Standard Flavor'}
              </h3>
              <img
                className="nutrition-image"
                src={nutritional}
                alt="Nutrition Facts"
              />
              <h3 className="chip-price">Price: ${price}</h3>
              <button
                className="single-chip-add-to-cart"
                onClick={submitHandler}>
                Buy Now
              </button>
              <Link to="/">Back to Products</Link>
            </div>
          </section>
          <section>
            <div>Our customers also like</div>
          </section>
        </div>
      </section>

      <section id="footerSection">
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </>
  );
};

export default SingleProduct;
