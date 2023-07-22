import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// save cart items to local storage
const saveCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (id) => {
  try {
    const { data } = await axios.get(`/api/order/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const updatedOrder = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    try {
      const { data } = await axios.put(`/api/order/${order.id}`, order);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const addToCart = createAsyncThunk('order/addToCart', async (item) => {
  try {
    const { data } = await axios.post('/api/cart', item);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

export const singleOrder = createSlice({
  name: 'singleOrder',
  initialState: {
    orders: initialCartItems,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updatedOrder.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const updatedOrders = [...state.orders, action.payload];
        saveCartItemsToLocalStorage(updatedOrders);
        return {
          ...state,
          orders: updatedOrders,
        };
      });
  },
});

export default singleOrder.reducer;
