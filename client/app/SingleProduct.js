import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import { getSingleChipData } from './LandingPageSlice';
import Navbar from '../features/navbar/Navbar';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const singleChip = useSelector((state) => state.landingPage.singleChipInfo);
  console.log(singleChip);
  const { id } = useParams();
  console.log(id);
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

  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(singleChip));
  };

  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);
  console.log(singleChip);
  return (
    <section>
      <Navbar />
      <div>
        <h1 className='chip-brand'>{brand}</h1>
      </div>
      <div>
        <section className='single-product-container'>
          <div className='chip-img-container'>
            <img className='img-single-chip' src={imageUrl} alt={title} />
          </div>
          <div className='info-container'>
            <h1 className='chip-title'>{title}</h1>
            <p className='chip-description'>{description}</p>
            <h3 className='chip-ingredients'>Ingredients: {ingredients}</h3>
            <h3 className='chip-size'>Size: {size}oz</h3>
            <h3 className='chip-size'>{baked ? 'Baked' : 'Standard Flavor'}</h3>
            <img
              className='nutrition-image'
              src={nutritional}
              alt='Nutrition Facts'
            />
            <h3 className='chip-price'>Price: ${price}</h3>
            <button className='single-chip-add-to-cart'>Buy Now</button>
            <Link to='/'>Back to Products</Link>
          </div>
        </section>
        <section>
          <div>Our customers also like</div>
        </section>
      </div>
    </section>
  );
};

export default SingleProduct;
