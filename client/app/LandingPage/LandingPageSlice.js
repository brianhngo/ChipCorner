import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// fetch Best seller products
export const getChipDataList = createAsyncThunk('GET /api/users', async () => {
  try {
    const { data } = await axios.get('api/chips/landingPage');
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
});

// fecth data for single chip

export const getSingleChipData = createAsyncThunk(
  'GET api/chips/',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/chips/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

// fetch all data Chips
export const getAllChipDataList = createAsyncThunk('GET /api/chips', async () => {
  try {
    const {data} = await axios.get('/api/chips')
    console.log('data',data)
    return data
  } catch (error){
    console.error(error)
  }
}) 

const landingPageSlice = createSlice({
  name: 'LandingPage',
  initialState: {
    chipsInfo: [],
    singleChipInfo: {},
    allChipInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChipDataList.fulfilled, (state, { payload }) => {
        state.chipsInfo = payload;
      })
      .addCase(getSingleChipData.fulfilled, (state, { payload }) => {
        state.singleChipInfo = payload;
      })
      .addCase(getAllChipDataList.fulfilled, (state, {payload}) => {
        state.allChipInfo = payload;
      });
  },
});

export default landingPageSlice.reducer;
