import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link } from 'react-router-dom'
import { getSingleChipData } from './LandingPageSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const singleChip = useSelector((state) => state.landingPage.singleChipInfo);
    console.log(singleChip)
    const {id} = useParams()
    console.log(id)
    const { price, title, description, brand, size, baked, ingredients, imageUrl, nutritional }  = singleChip;

  console.log(price)

    useEffect(() => {
        dispatch(getSingleChipData(id));
      }, []);


  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);
  console.log(singleChip);
  return (
    <div>

    <section className='single-product-container'>
      <div className="chip-img-container">
        <p>Image goes here</p>
        <img className='img-single-chip' src={imageUrl} alt={title} />
      </div>
      <div className='info-container'>
        <h3 className='chip-brand'>Brand: {brand}</h3>
        <h1 className='chip-title'>{title}</h1>
        <p className='chip-description'>{description}</p>
        <h3 className='chip-ingredients'>Ingredients: {ingredients}</h3>
        <h3 className='chip-size'>Size: {size}oz</h3>
        <h3 className='chip-size'>{baked ? 'Baked' : 'Not Baked'}</h3>
        <h3 className='nutrition-label'>Nutrition Facts: {nutritional}</h3>
        <h3 className='chip-price'>Price: ${price}</h3>
        <button className='single-chip-add-to-cart'>Buy Now</button>
        <Link to="/products">Back to Products</Link>
      </div>
    </section>
    <section>
      <div>Our customers also like</div>
    </section>
  </div>
  );
};

export default SingleProduct;
