import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChipDataList} from '../LandingPage/LandingPageSlice.js';
import { Link } from 'react-router-dom'; 
import './RecommendProduct.css'

export default function RecommendProducts() {

const chipsDataList = useSelector((state) => state.landingPage.allChipInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChipDataList());
  }, [dispatch]);
  
  return (
    <div className = 'products-container-recommend'>
      {chipsDataList?.map((chip) => {
        return (
          <div key={chip.id}> 
            <Link to={`/chips/${chip.id}`}> 
              <div className='product-card-recommend'>
                <img
                  src={chip.imageUrl}
                  width={400}
                  height={400}
                  className='product-image-recommend'
                  alt={chip.title} 
                />
                <p className='product-name-recommend'> {chip.title} </p>
                <p className='product-price-recommend'>${chip.price} </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  )
}
