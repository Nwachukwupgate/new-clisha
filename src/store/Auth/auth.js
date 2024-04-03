import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
// import url from "../../json/config";
const api = process.env.REACT_APP_API;

let token = window.localStorage.getItem("token");
const config = { headers: { Authorization: `bearer ${token}` } };
const links = ["signup", "signin", "forgot-password", "new-password", "verify"];
export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const res = await axios.get(`${api}/user/profile`, config);
    const balance = res.data.data.rank.balance;
    const isDev = res.data.data?.user?.developer;
    const earned_amount = res.data.data?.rank?.earned_amount;
    window.localStorage.setItem('earned_amount', earned_amount)
    window.localStorage.setItem("balance", balance);
    window.localStorage.setItem("isDev", isDev);

    if (res.data.data?.user?.status === 0) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return res.data.data;
  } catch (error) {
    localStorage.removeItem("token");
    if (!token && links.includes(window.location.pathname)) {
      window.location.href = "/signin";
    }
  }
});

export const authSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      user: {},
      timezone: { time: "" },
      rank: { rankName: "" },
      completed: [],
    },
    loading: false,
    error: false,
  },
  reducers: {
    logoutAction: () => {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    },
    updateUserWalletId: (state, action) => {
      state.data = {
        ...state.data,
        rank: { ...state.data.rank, coinwallet_id: action.payload },
      };
    },
    updateUserPoints: (state, action) => {
      state.data.rank.balance = action.payload;
    },

    updateEarn: (state, action) => {
      state.data.rank.earned_amount = action.payload;
    },

    updateProfile: (state, action) => {
      // state.error = false
      // state.loading = true
      // axios.post(`${api}/user/profile`, action.payload, config).then((res) => {
      //     // window.location.href = "/dashboard/profile"
      //     state.loading = false
      // }).catch((err) => {
      //     state.error=true
      //     state.loading=false
      //     console.log(err)
      // });
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUser.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

export const userSelectWalletID = (state) => state.user.data.rank.coinwallet_id;
export const userSelectPoints = (state) => state.user.data.rank.balance;

export const {
  logoutAction,
  updateProfile,
  updateUserWalletId,
  updateUserPoints,
  updateEarn,
} = authSlice.actions;

export default authSlice.reducer;
