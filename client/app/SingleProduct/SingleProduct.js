import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getSingleChipData } from '../LandingPage/LandingPageSlice';
import Navbar from '../Navbar/Navbar.js';

import RecommendProducts from './RecommendProducts.js';
import { changeOrder } from '../cart/CartPageSlice.js';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { toast } from 'react-toastify';
import './RecommendProduct.css'
import '../LandingPage/LandingPage.css'

const SingleProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const singleChip = useSelector((state) => state.landingPage.singleChipInfo);
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0)

  const increaseHandler = () => {
    setQuantity(quantity + 1)
  }

  const decreaseHandler = () => {
    if (quantity <= 0){
      return
    }
    setQuantity(quantity - 1)
  }

  const addToCartHandler = (event) => {
    event.preventDefault();
    toast.success('Added to Cart!')
    dispatch(changeOrder({
      id:id,
      quantity: quantity,
    }))
  }

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
   const images = [ imageUrl, nutritional]
  

  

  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);

 

  useEffect(() => {
  dispatch(getSingleChipData(id));
  setQuantity(0)
}, [id]);

  return (
    <div>
      <div className = 'product-detail-container'> 
        <div className = 'containerImage'> 
          
          <div className = 'image-container'> 
              <img src = {images[index]} className = 'product-detail-image'/>
              <div className="small-images-container">
            {[ imageUrl, nutritional].map((item, i) => (
            <img key={i} src={item} className={i === index ? 'small-image selected-image' : 'small-image'}
            onMouseEnter={() => setIndex(i)}
            alt={`Image ${i}`} />
            ))}
          </div>
              
          </div>
          

          <div className = "product-detail-desc">
            <h1> {singleChip.title} {singleChip.size}oz </h1>
            <div className = 'reviews'> 
              <AiFillStar/> 
              <AiFillStar/>
               <AiFillStar/> 
              <AiFillStar/> 
               <AiOutlineStar/> 
              <p> (20) </p>
            </div>
            <h4>Details: </h4>
            <p>  {singleChip.description} </p>
            <h4>Ingredients </h4>
            <p> {singleChip.ingredients} </p>
            <p className = 'price'> ${singleChip.price} </p>
            <div className = 'quantity'> 
              <h3> Quantity: </h3>
              <p className = "quantity-desc">
                <span className = "minus" onClick = {decreaseHandler}>
                     <AiOutlineMinus/> 
                </span>
                <span className = "num" onClick = "">
                    {quantity}
                </span>
                <span className = "plus" onClick = {increaseHandler}>
                    <AiOutlinePlus/> 
                </span>
              </p>
            </div>

            <div className = "buttons">
              <button type = 'button' className = "add-to-cart" onClick = {addToCartHandler}> Add to Cart </button>
              <button type = 'button' className = "buy-now" onClick = {() => navigate('/payment')}> Buy Now </button>
            </div>

            
          </div>
       
        </div>
      </div>

      <div className = 'maylike-products-wrapper'>
            <h2> You may also like </h2>
            <div className = 'marquee'>
              <div className = 'maylike-products-container track'>
                <RecommendProducts/>
              </div>
            </div>
      </div>
    </div>
  );
};

export default SingleProduct;
