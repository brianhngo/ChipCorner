import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getSingleChipData } from '../LandingPage/LandingPageSlice';
import Navbar from '../Navbar/Navbar.js';

import RecommendProducts from './RecommendProducts.js';
import { changeOrder } from '../cart/CartPageSlice.js';
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { getUpdateProfileData } from '../MyProfile/ProfileSlice';
import { toast } from 'react-toastify';
import './RecommendProduct.css';
import '../LandingPage/LandingPage.css';
import { updateBookmark } from '../LandingPage/LandingPageSlice';

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const singleChip = useSelector((state) => state.landingPage.singleChipInfo);
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [bookmarkStatus, setBookMarkStatus] = useState(false);

  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );
  console.log(userProfileData);

  const bookMarkHandler = (event) => {
    event.preventDefault();
    // User not logged in
    if (userProfileData === null) {
      if (bookmarkStatus === false) {
        const bookmarkData =
          JSON.parse(window.localStorage.getItem('bookmark')) || {};
        bookmarkData[id] = id;
        window.localStorage.setItem('bookmark', JSON.stringify(bookmarkData));
        setBookMarkStatus(!bookmarkStatus);
        toast.success('Bookmarked!');
      } else {
        const bookmarkData =
          JSON.parse(window.localStorage.getItem('bookmark')) || {};
        delete bookmarkData[id];
        window.localStorage.setItem('bookmark', JSON.stringify(bookmarkData));
        setBookMarkStatus(!bookmarkStatus);
        toast.success('Removed from Bookmarks');
      }
    } else {
      if (bookmarkStatus === true) {
        setBookMarkStatus(!bookmarkStatus);
        toast.success('Removed from Bookmarks');
        dispatch(
          updateBookmark({
            userId: userProfileData.id,
            id: id,
            status: 'delete',
          })
        );
      } else {
        setBookMarkStatus(!bookmarkStatus);
        toast.success('Bookmarked!');
        dispatch(
          updateBookmark({
            userId: userProfileData.id,
            id: id,
            status: 'add',
          })
        );
      }
    }
  };

  const increaseHandler = () => {
    setQuantity(quantity + 1);
  };

  const decreaseHandler = () => {
    if (quantity <= 0) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const addToCartHandler = (event) => {
    event.preventDefault();
    toast.success('Added to Cart!');
    dispatch(
      changeOrder({
        id: id,
        quantity: quantity,
      })
    );
  };

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
  const images = [imageUrl, nutritional];

  useEffect(() => {
    dispatch(getSingleChipData(id));
  }, []);

  useEffect(() => {
    dispatch(getSingleChipData(id));
    setQuantity(0);
  }, [id]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const getProfileData = async (token) => {
      dispatch(
        getUpdateProfileData({
          token: token,
        })
      );
    };
    getProfileData(token);
    // user is not signed in
    if (userProfileData === null) {
      const bookmarkData =
        JSON.parse(window.localStorage.getItem('bookmark')) || {};
      if (bookmarkData[id]) {
        setBookMarkStatus(true);
      }
    } else {
      // user is signed in
    }
  }, []);

  return (
    <div>
      <div className="product-detail-container">
        <div className="containerImage">
          <div className="image-container">
            <img src={images[index]} className="product-detail-image" />
            <div className="small-images-container">
              {[imageUrl, nutritional].map((item, i) => (
                <img
                  key={i}
                  src={item}
                  className={
                    i === index ? 'small-image selected-image' : 'small-image'
                  }
                  onMouseEnter={() => setIndex(i)}
                  alt={`Image ${i}`}
                />
              ))}
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>
              {' '}
              {singleChip.title} {singleChip.size}oz{' '}
            </h1>
            <div className="reviews">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <p> (20) </p>
              <div
                className={`bookmark-icon ${
                  bookmarkStatus ? 'bookmarked' : ''
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-bookmark-star-fill"
                  viewBox="0 0 16 16"
                  onClick={bookMarkHandler}>
                  <path
                    fillRule="evenodd"
                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                  />
                </svg>
              </div>
            </div>
            <h4>Details: </h4>
            <p> {singleChip.description} </p>
            <h4>Ingredients </h4>
            <p> {singleChip.ingredients} </p>
            <p className="price"> ${singleChip.price} </p>
            <div className="quantity">
              <h3> Quantity: </h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decreaseHandler}>
                  <AiOutlineMinus />
                </span>
                <span className="num" onClick="">
                  {quantity}
                </span>
                <span className="plus" onClick={increaseHandler}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={addToCartHandler}>
                {' '}
                Add to Cart{' '}
              </button>
              <button
                type="button"
                className="buy-now"
                onClick={() => navigate('/payment')}>
                {' '}
                Buy Now{' '}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2> You may also like </h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            <RecommendProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
