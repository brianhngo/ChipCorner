import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUpdateProfileData } from '../MyProfile/ProfileSlice.js';
import {
  getBookmarkData,
  getBookmarkDataGuess,
} from '../LandingPage/LandingPageSlice.js';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );
  const userProfileBookmark = useSelector(
    (state) => state.landingPage.bookmark
  );

  const [bookmarkData, setBookmarkData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token') || null;

    const fetchData = async () => {
      console.log('hi2');
      if (token) {
        dispatch(
          getUpdateProfileData({
            token: token,
          })
        );
        dispatch(
          getBookmarkData({
            token: token,
          })
        );
      } else {
        // Guest
        console.log('guests');
        const data = JSON.parse(window.localStorage.getItem('bookmark')) || [];
        const listOfData = Object.values(data);
        dispatch(
          getBookmarkDataGuess({
            listOfChips: listOfData,
          })
        );
      }
    };

    fetchData();
  }, []);

  console.log(userProfileBookmark);
  return (
    <>
      <h1 className="user-info"> Bookmarked Products</h1>
      <section id="productsSection">
        <div className="products-AllChips-container">
          {userProfileBookmark.length > 0 ? (
            userProfileBookmark.map((chip) => {
              return (
                <div key={chip.id}>
                  <Link to={`/chips/${chip.id}`}>
                    <div className="product-AllChips-card">
                      <img
                        src={chip.imageUrl}
                        width={400}
                        height={400}
                        className="product-AllChips-image"
                        alt={chip.title}
                      />
                      <p className="product-AllChips-name"> {chip.title} </p>
                      <p className="product-AllChips-price"> ${chip.price} </p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <h1> hi</h1>
          )}
        </div>
      </section>
    </>
  );
}
