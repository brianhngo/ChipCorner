import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const singleOrder = createSlice({
  name: 'singleOrder',
  initialState: {},
  reducers: {
    changeOrder: (state, { payload }) => {
      console.log('hi');
      const { id } = payload;

      const cartData = JSON.parse(window.localStorage.getItem('cart'));
      if (!cartData) {
        cartData = {};
      }
      if (!cartData[id]) {
        cartData[id] = 1;
      } else {
        cartData[id] += 1;
      }

      window.localStorage.setItem('cart', JSON.stringify(cartData));
    },
  },
  extraReducers: {},
});

export const { changeOrder } = singleOrder.actions;
export default singleOrder.reducer;
