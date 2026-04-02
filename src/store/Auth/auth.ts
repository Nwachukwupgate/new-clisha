import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { clearAuthStorage } from '../../utils/functions/functions';
import { Rank, Timezone, User } from '../../types';
// import url from "../../json/config";
const api = process.env.REACT_APP_API;

const links = ['signup', 'signin', 'forgot-password', 'new-password', 'verify'];

// Define the type for the user data
interface UserData {
  user: User;
  timezone: Timezone;
  rank: Rank;
}

// Define the type for the state
interface UserState {
  data: UserData;
  loading: boolean;
  error: boolean;
}

/** Fresh token + timeout per request (module-level config was stale after login). */
const PROFILE_REQ = { timeout: 45_000 as const };

export const getUser = createAsyncThunk<UserData | null, void, { state: { user: UserState } }>(
  'user/getUser',
  async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `bearer ${token}` }, ...PROFILE_REQ };
    try {
      const res = await axios.get(`${api}/user/profile`, config);
      const { balance } = res.data.data.rank;
      const isDev = res.data.data?.user?.developer;
      const earned_amount = res.data.data?.rank?.earned_amount;
      window.localStorage.setItem('earned_amount', earned_amount);
      window.localStorage.setItem('balance', balance);
      window.localStorage.setItem('isDev', isDev);

      if (res.data.data?.user?.status === 0) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }
      return res.data.data;
    } catch {
      localStorage.removeItem('token');
      const path = window.location.pathname || '';
      if (path.startsWith('/clisha-x')) {
        window.location.replace(`${window.location.origin}/clisha-x/login`);
      } else if (links.some((l) => path.includes(l))) {
        window.location.href = '/signin';
      }
      return null;
    }
  },
  {
    /** Prevents overlapping profile requests from leaving `user.loading` stuck true (e.g. Layout + page both dispatching). */
    condition: (_, { getState }) => !getState().user.loading,
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      user: {},
      timezone: { time: '', today: '' },
      rank: { rankName: '', balance: 0, earned_amount: 0, bonus_points: 0 },
    },
    loading: false,
    error: false,
  } as UserState,
  reducers: {
    logoutAction: () => {
      clearAuthStorage();
      window.location.href = '/signin';
    },
    updateUserWalletId: (state, action: PayloadAction<string>) => {
      state.data = {
        ...state.data,
        rank: { ...state.data.rank, coinwallet_id: action.payload },
      };
    },
    updateUserPoints: (state, action: PayloadAction<number>) => {
      state.data.rank.balance = action.payload;
    },

    updateEarn: (state, action: PayloadAction<number>) => {
      state.data.rank.earned_amount = action.payload;
    },

    updateProfile: () => {},
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUser.pending, (state) => {
      // Add user to the state array
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.data = action.payload;
        state.error = false;
      } else {
        state.error = true;
      }
    });
    builder.addCase(getUser.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

export const userSelectWalletID = (state: {
  user: { data: { rank: { coinwallet_id: string } } };
}) => state.user.data.rank.coinwallet_id;
export const userSelectPoints = (state: { user: { data: { rank: { balance: number } } } }) =>
  state.user.data.rank.balance;

export const { logoutAction, updateProfile, updateUserWalletId, updateUserPoints, updateEarn } =
  authSlice.actions;

export default authSlice.reducer;
