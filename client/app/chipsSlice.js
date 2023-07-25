import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addChips = createAsyncThunk('chips/addChips', async (newChips) => {
  try {
    const { data } = await axios.post('/api/chips', newChips);
    return data;
  } catch (err) {
    return err.message;
  }
});

export const deleteChips = createAsyncThunk('chips/deleteChips', async (id) => {
  try {
    await axios.delete(`/api/chips/${id}`);
    return id;
  } catch (err) {
    return err.message;
  }
});

export const updateChips = createAsyncThunk(
  'chips/updateChips',
  async (updatedChips) => {
    try {
      const { data } = await axios.put(
        `/api/chips/${updatedChips.id}`,
        updatedChips
      );
      return data;
      // console.log(data)
    } catch (err) {
      return err.message;
    }
  }
);

const chipsSlice = createSlice({
  name: 'chips',
  initialState: {
    chips: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChips.fulfilled, (state, { payload }) => {
        state.chips.push(payload);
      })
      .addCase(deleteChips.fulfilled, (state, { payload }) => {
        state.chips = state.chips.filter((chips) => chips.id !== payload);
      })
      .addCase(updateChips.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default chipsSlice.reducer;
