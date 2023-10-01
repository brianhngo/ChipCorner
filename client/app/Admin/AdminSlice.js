import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// saving Personal Contact Information
export const allOrders = createAsyncThunk('/api/allOrders', async () => {
  try {
    const { data } = await axios.get('/api/order');

    return data;
  } catch (err) {
    return err.message;
  }
});

// Get ADMIN POV a particular order data
export const singleOrder = createAsyncThunk('/api/singleOrder', async (id) => {
  try {
    const { data } = await axios.put('/api/order/orderHistoryIndividual', {
      orderId: id,
    });

    return data;
  } catch (err) {
    return err.message;
  }
});

// GET ADMIN POV of all products listed in the store
export const allProductsListData = createAsyncThunk(
  '/api/allProductsAdmin',
  async (id) => {
    try {
      const { data } = await axios.get('/api/chips');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT ADMIN POV of individual products listed in the store
export const getAdminSingleProductData = createAsyncThunk(
  '/api/getAdminSingleProductData',
  async (id) => {
    try {
      const { data } = await axios.put('/api/chips/getAdminSingleProductData', {
        id: id,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT ADMIN POV  saving individual products listed in the store
export const saveAdminSingleProductData = createAsyncThunk(
  'api/users/saveAdminSingleProduct',
  async (chipData) => {
    try {
      const { data } = await axios.put('/api/chips/saveAdminSingleProduct', {
        chipData: chipData,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT ADMIN POV Get a list of admins
export const getAdminUserList = createAsyncThunk(
  '/api/users/AdminUserList',
  async () => {
    try {
      const { data } = await axios.put('/api/users/adminUsersList');
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAdminSingleUserList = createAsyncThunk(
  '/api/users/SingleUserList',
  async (id) => {
    try {
      const { data } = await axios.put('/api/users/adminUserInfo', {
        id: id,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const AdminSlice = createSlice({
  name: 'profile',
  initialState: {
    allProducts: [],
    singleProducts: [],
    saveProduct: null,
    allOrders: [],
    singleOrder: [],
    allUsers: [],
    singleUser: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.fulfilled, (state, { payload }) => {
        state.allOrders = payload;
      })
      .addCase(singleOrder.fulfilled, (state, { payload }) => {
        state.singleOrder = payload;
      })
      .addCase(allProductsListData.fulfilled, (state, { payload }) => {
        state.allProducts = payload;
      })
      .addCase(getAdminUserList.fulfilled, (state, { payload }) => {
        state.allUsers = payload;
      })
      .addCase(getAdminSingleUserList.fulfilled, (state, { payload }) => {
        state.singleUser = payload;
      })
      .addCase(getAdminSingleProductData.fulfilled, (state, { payload }) => {
        state.singleProducts = payload;
      })
      .addCase(saveAdminSingleProductData.fulfilled, (state, { payload }) => {
        state.saveProduct = payload;
      });
  },
});

export default AdminSlice.reducer;
