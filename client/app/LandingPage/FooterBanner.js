import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChipDataList } from './LandingPageSlice.js';
import './FooterBanner.css';

export default function FooterBanner() {
  const chipsDataList = useSelector((state) => state.landingPage.chipsInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch data when the component mounts
    dispatch(getChipDataList());
  }, [dispatch]);

    const buttonHandler = (event) => {
    event.preventDefault();
    navigate('/chips/6')
  };

  // Check if chipsDataList is empty or not yet loaded
  if (chipsDataList.length === 0) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  // Now you can safely access chipsDataList
  return (
    <div className="hero-banner-containers">
      <div>
       
        <p className="chips-solo"> Sale of the Month! </p>
   
        <h3>{chipsDataList[2].title}</h3>
         
         <p> </p>
        <h3> Get an Extra 20% Off Today!</h3>
         <p className="chips-solo"> Use promocode : ABC123 </p>
        <img src={chipsDataList[2].imageUrl} alt="headphones" className="hero-banner-image-footer" />
        <Link to = {`chips/${chipsDataList[2].id}`}>
          <button type="button" onClick={buttonHandler}>
            Shop Now
          </button>
        </Link>
        <div className="desc-footer">
          <h4>Description</h4>
          <p>{chipsDataList[2].description}</p>
        </div>
      </div>
    </div>
  );
}






