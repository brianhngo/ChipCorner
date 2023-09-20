import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updateProfile = createAsyncThunk(
  '/api/users/updateprofile',
  async ({ firstname, lastname, phone, token }) => {
    try {
      const { data } = await axios.put('/api/users/updateprofile', {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        token: token,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getUpdateProfileData = createAsyncThunk(
  '/api/users/getProfileContact',
  async ({ token }) => {
    try {
      const { data } = await axios.put('/api/users/getprofiledata', {
        token: token,
      });
      return data;
    } catch (error) {
      return err.message;
    }
  }
);

export const updateProfile2 = createAsyncThunk(
  '/api/users/updateprofile2',
  async ({ address, zipcode, city, state, country, token }) => {
    try {
      const { data } = await axios.put('/api/users/updateprofile2', {
        address: address,
        zipcode: zipcode,
        city: city,
        state: state,
        country: country,
        token: token,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    storage: {
      information: null,
      status: null,
    },
  },
  reducers: {
    resetUserInfo: (state) => {
      state.storage.information = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.storage.status = payload;
      })
      .addCase(getUpdateProfileData.fulfilled, (state, { payload }) => {
        state.storage.information = payload;
      })
      .addCase(updateProfile2.fulfilled, (state, { payload }) => {
        state.storage.status = payload;
      });
  },
});
export const { resetUserInfo } = ProfileSlice.actions;
export default ProfileSlice.reducer;
