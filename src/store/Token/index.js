import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import url from "../../json/config";
const api = process.env.REACT_APP_API_TASK;

const token = window.localStorage.getItem('token');
const config = { headers: { Authorization: `bearer ${token}` } };
export const getEarnedToken = createAsyncThunk('task/getEarnedToken', async () => {
  const res = await axios.get(`${api}/tokens/distributed`, config);
  return res.data.data;
});
export const getAllToken = createAsyncThunk('token/getAllToken', async () => {
  const res = await axios.get(`${api}/clisha/tokens`, config);
  return res.data.data;
});
export const getBonusToken = createAsyncThunk('token/getBonusToken', async () => {
  const res = await axios.get(`${api}/tokens/bonus`, config);
  return res.data.data;
});

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    earnedToken: [],
    allToken: [],
    bonus: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEarnedToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.earnedToken = action.payload;
    });
    builder.addCase(getAllToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.allToken = action.payload;
    });
    builder.addCase(getBonusToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.bonus = action.payload;
    });
  },
});

// export const { completeTask } = tokenSlice.actions;
export default tokenSlice.reducer;
