import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChipDataList } from './LandingPageSlice.js';
import { Link } from 'react-router-dom'; 
import './BestSellers.css'

export default function BestSellers() {
  const chipsDataList = useSelector((state) => state.landingPage.chipsInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChipDataList());
  }, [dispatch]);

  return (
    <div className = 'products-container'>
      {chipsDataList.map((chip) => {
        return (
          <div key={chip.id}> 
            <Link to = {`/chips/${chip.id}`}> 
              <div className='product-card'>
                <img
                  src={chip.imageUrl}
                  width={400}
                  height={400}
                  className='product-image'
                  alt={chip.title} 
                />
                <p className='product-name'> {chip.title} </p>
                <p className='product-price'> ${chip.price} </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}