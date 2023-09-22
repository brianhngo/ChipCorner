import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// fetch Best seller products
export const getChipDataList = createAsyncThunk('GET /api/users', async () => {
  try {
    const { data } = await axios.get('api/chips/landingPage');
    console.log(data);
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
export const getAllChipDataList = createAsyncThunk(
  'GET /api/chips',
  async () => {
    try {
      const { data } = await axios.get('/api/chips');
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateBookmark = createAsyncThunk(
  'PUT /api/chips/bookmarks',
  async (bookmark) => {
    try {
      const { data } = await axios.put('/api/users/bookmark', bookmark);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getBookmarkData = createAsyncThunk(
  'put /api/chips/bookmarks',
  async (id) => {
    try {
      const { data } = await axios.put('/api/users/bookmarksdata', id);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getBookmarkDataGuess = createAsyncThunk(
  'put /api/users/getUsersChipData',
  async (obj) => {
    try {
      const { data } = await axios.put('/api/users/getUsersChipData', obj);
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
    allChipInfo: [],
    bookmark: {},
    status: null,
  },
  reducers: {
    removeBookmark: (state, { payload }) => {
      state.bookmark = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChipDataList.fulfilled, (state, { payload }) => {
        state.chipsInfo = payload;
      })
      .addCase(getSingleChipData.fulfilled, (state, { payload }) => {
        state.singleChipInfo = payload;
      })
      .addCase(getAllChipDataList.fulfilled, (state, { payload }) => {
        state.allChipInfo = payload;
      })
      .addCase(updateBookmark.fulfilled, (state, { payload }) => {
        state.status = true;
      })
      .addCase(getBookmarkData.fulfilled, (state, { payload }) => {
        state.bookmark = payload;
      })
      .addCase(getBookmarkDataGuess.fulfilled, (state, { payload }) => {
        state.bookmark = payload;
      });
  },
});

export const { removeBookmark } = landingPageSlice.actions;
export default landingPageSlice.reducer;
