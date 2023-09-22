import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUpdateProfileData,
  getOrderHistoryProfile,
} from './ProfileSlice.js';

export default function ProfilePastOrders() {
  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );

  const orderHistoryData = useSelector(
    (state) => state.profile.storage.orderHistoryData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token') || '';
    const getProfileData = async (token) => {
      dispatch(
        getUpdateProfileData({
          token: token,
        })
      );
    };
    getProfileData(token);
    dispatch(
      getOrderHistoryProfile({
        userId: userProfileData.id,
      })
    );
  }, []);
  console.log(orderHistoryData);
  return (
    <section className="profileContainer">
      <div>Profile Orders</div>
    </section>
  );
}
