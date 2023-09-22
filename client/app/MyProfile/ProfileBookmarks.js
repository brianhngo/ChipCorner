import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUpdateProfileData,
  getOrderHistoryProfile,
} from './ProfileSlice.js';

export default function ProfileBookmarks() {
  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );
  const dispatch = useDispatch();
  console.log('Balloon');
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
    console.log('Balloon1');
    dispatch(
      getOrderHistoryProfile({
        userId: userProfileData.id,
      })
    );
  }, []);

  return (
    <section className="profileContainer">
      <div>ProfileBookmarks</div>
    </section>
  );
}
