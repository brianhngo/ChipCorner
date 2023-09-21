import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCartData = createAsyncThunk(
  'PUT api/users/carts',
  async ({ arrayOfProductIdInteger }) => {
    try {
      const { data } = await axios.put('api/chips/cartData', {
        array: arrayOfProductIdInteger,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const submitOrder = createAsyncThunk(
  'post api/orders/',
  async (orderData) => {
    try {
      console.log(orderData);
      const { data } = await axios.post('api/order/', {
        data: orderData,
      });
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
    quantityAmount: JSON.parse(window.localStorage.getItem('cartNumber')) || 0,
    orderData: {},
  },
  reducers: {
    changeOrder: (state, { payload }) => {
      // Adding to Local Storage when person hits checkout
      const { id, quantity } = payload;

      const cartData = JSON.parse(window.localStorage.getItem('cart')) || {};
      let cartNumber = JSON.parse(
        window.localStorage.getItem('cartNumber') || 0
      );
      if (cartNumber === 0) {
        state.quantityAmount = 0;
      }

      if (!cartData[id]) {
        cartData[id] = quantity;
        cartNumber += quantity; // updates cart
        state.quantityAmount = cartNumber; // upates state
      } else {
        cartData[id] += quantity;
        cartNumber += quantity; // updats cart
        state.quantityAmount = cartNumber; // updates state
      }

      window.localStorage.setItem('cart', JSON.stringify(cartData));
      window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber));
    },
    decreaseQuantity: (state, { payload }) => {
      if (state.quantityAmount <= 0) {
        return;
      }
      state.quantityAmount -= 1;
    },
    increaseQuantity: (state, { payload }) => {
      state.quantityAmount += 1;
    },
    removeQuantity: (state, { payload }) => {
      const { value } = payload;
      state.quantityAmount -= value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.fulfilled, (state, { payload }) => {
        state.cartData = payload;
      })
      .addCase(submitOrder.fulfilled, (state, { payload }) => {
        state.orderData = payload;
      });
  },
});

export const {
  changeOrder,
  decreaseQuantity,
  increaseQuantity,
  removeQuantity,
} = singleOrder.actions;
export default singleOrder.reducer;
