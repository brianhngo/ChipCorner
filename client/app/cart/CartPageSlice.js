import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//fetch users order
export const fetchOrder = createAsyncThunk("order/fetchOrder", async (id) => {
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
  "order/updateOrder",
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

export const singleOrder = createSlice({
  name: "singleOrder",
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});
export default singleOrder.reducer;
