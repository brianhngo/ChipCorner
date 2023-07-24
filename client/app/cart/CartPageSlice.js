import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCartData = createAsyncThunk(
  'PUT api/users/carts',
  async ({ arrayOfProductIdInteger }) => {
    try {
      const { data } = await axios.put('api/chips/cartData', {
        array: arrayOfProductIdInteger,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const singleOrder = createSlice({
  name: 'singleOrder',
  initialState: {
    cartData: [],
  },
  reducers: {
    changeOrder: (state, { payload }) => {
      const { id } = payload;

      const cartData = JSON.parse(window.localStorage.getItem('cart')) || {};
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
  extraReducers: (builder) => {
    builder.addCase(getCartData.fulfilled, (state, { payload }) => {
      state.cartData = payload;
    });
  },
});

export const { changeOrder } = singleOrder.actions;
export default singleOrder.reducer;
