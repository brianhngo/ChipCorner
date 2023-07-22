import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Verify if the User's input (email & username) doesn't exist in our db
export const verifyUserInput = createAsyncThunk(
  'PUT api/users/verifyNewUserInputs',
  async ({ username, email }) => {
    try {
      const { data } = await axios.put('api/users/verifyNewUserInputs', {
        username: username,
        email: email,
      });
      return data.exists;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createNewUser = createAsyncThunk(
  'POST api/users/',
  async (obj) => {
    try {
      console.log(obj);
      const data = await axios.post('api/users/', obj);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const CreateNewUserSlice = createSlice({
  name: 'NewUser',
  initialState: {
    verifyStatus: null,
    createUserStatus: null,
  },
  reducers: {
    changeStatus: (state, { payload }) => {
      state.createUserStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserInput.fulfilled, (state, { payload }) => {
        if (payload === true) {
          // Cannot Make a New User
          state.verifyStatus = payload;
        } else {
          // Can make a new user // payload is false

          state.verifyStatus = payload;
        }
      })
      .addCase(createNewUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.createUserStatus = true;
          state.verifyStatus = null;
        } else {
          state.createUserStatus = false;
        }
      });
  },
});
export const { changeStatus } = CreateNewUserSlice.actions;
export default CreateNewUserSlice.reducer;
