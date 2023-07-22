import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getChipDataList = createAsyncThunk('GET /api/users', async () => {
  try {
    const { data } = await axios.get('api/chips/landingPage');
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

const landingPageSlice = createSlice({
  name: 'LandingPage',
  initialState: {
    chipsInfo: [],
    singleChipInfo: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChipDataList.fulfilled, (state, { payload }) => {
        state.chipsInfo = payload;
      })
      .addCase(getSingleChipData.fulfilled, (state, { payload }) => {
        state.singleChipInfo = payload;
      });
  },
});

export default landingPageSlice.reducer;
