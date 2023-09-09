import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChipDataList } from './LandingPageSlice.js';
import './HeroBanner.css';


export default function HeroBanner() {
  const chipsDataList = useSelector((state) => state.landingPage.chipsInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch data when the component mounts
    dispatch(getChipDataList());
  }, [dispatch]);

  const buttonHandler = (event) => {
    event.preventDefault();
    navigate('/chips/10')
  };

  // Check if chipsDataList is empty or not yet loaded
  if (chipsDataList.length === 0) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }



  // Now you can safely access chipsDataList
  return (
    <div className="hero-banner-container">
      <div>
        <p className="chips-solo"> Community's Choice: Voted by You! </p>
  

        <h3>{chipsDataList[4].title} Returns!</h3>
        <h3> Now in stock!</h3>
        <p> </p>
        <h3> Get an Extra 20% Off Today!</h3>
         <p className="chips-solo"> Use promocode : ABC123 </p>
        <img src={chipsDataList[4].imageUrl} alt="headphones" className="hero-banner-image" />
        <Link to = {`/chips/${chipsDataList[4].id}`}>
          <button type="button" onClick={buttonHandler}>
            Shop Now
          </button>
        </Link>
        <div className="desc">
          <h4>Description</h4>
          <p>{chipsDataList[4].description}</p>
        </div>
      </div>
    </div>
  );
}






