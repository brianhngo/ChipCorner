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

const LandingPageSlice = createSlice({
  name: 'LandingPage',
  initialState: {
    chipsInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChipDataList.fulfilled, (state, { payload }) => {
      state.chipsInfo = payload;
    });
  },
});

export default LandingPageSlice.reducer;
