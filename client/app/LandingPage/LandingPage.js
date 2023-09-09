import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppRoutes from '../AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getChipDataList } from './LandingPageSlice.js';
import MyCarousel from './MyCarousel.js';
import HeroBanner from './HeroBanner.js'
import FooterBanner from './FooterBanner.js'
import BestSellers from './BestSellers.js'
import './LandingPage.css'
const LandingPage = () => {
  const chipsDataList = useSelector((state) => state.landingPage.chipsInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChipDataList());
    
  }, [dispatch]);

  const buttonHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div> 
      <MyCarousel/>
      <HeroBanner/>
      <div className = 'products-heading'> 
        <h2> Best Selling Chips </h2>
        <p> Chips of many variation </p>
      </div>

     
      <BestSellers/>
     
      
      <FooterBanner/>
    </div>
  
  );
};

export default LandingPage;
