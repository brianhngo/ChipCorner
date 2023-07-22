import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//fetch users order
export const fetchOrder = createAsyncThunk('order/fetchOrder', async (id) => {
  try {
    const { data } = await axios.get(`/api/order/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//update users cart if item is deleted
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

//add item to the cart/order
export const addToCart = createAsyncThunk('order/addToCart', async (item) => {
  try {
    const { data } = await axios.post('/api/cart', item);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const singleOrder = createSlice({
  name: 'singleOrder',
  initialState: {
    orders: [],
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
        return {
          ...state,
          orders: [...state.orders, action.payload],
        };
      });
  },
});
export default singleOrder.reducer;
