import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = process.env.REACT_APP_API;

const token = window.localStorage.getItem('token');
const config = { headers: { Authorization: `bearer ${token}` } };

export const getRank = createAsyncThunk('task/getRank', async (page) => {
  const res = await axios.get(`${api}/ranking?page=${page}&size=34`, config);
  return res.data.data;
});
export const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    data: { totalItems: 0, ranking: [], totalPages: 0, currentPage: 1 },
    loading: false,
    page: 1,
  },
  reducers: {
    updateRankPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getRank.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRank.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getRank.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

export const { completeTask, updateRankPage } = rankSlice.actions;

export default rankSlice.reducer;
