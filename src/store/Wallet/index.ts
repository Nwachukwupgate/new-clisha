import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateUserPoints, updateUserWalletId } from '../Auth/auth';
import { AxiosError, VendoPackage, Wallet } from '../../types';
import { RootState } from '../store';

const api = process.env.REACT_APP_API_COMMERCE;
const api1 = process.env.REACT_APP_API;

const token = window.localStorage.getItem('token');

interface WalletState {
  addWalletStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  payoutStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  packageStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
  walletInput: string;
  transactions: {
    status: boolean;
    data: {
      totalItems: number;
      currentPage: number;
      totalPages: number;
      transactions: any[];
    };
    message: string;
  };
  vendoPackage: {
    status: number;
    data: VendoPackage;
    message: string;
  };
  wallet: {
    status: number;
    data: Wallet;
    message: string;
  };
}

const initialState: WalletState = {
  addWalletStatus: 'idle',
  payoutStatus: 'idle',
  packageStatus: 'idle',
  error: {},
  walletInput: '',
  transactions: {
    status: false,
    data: {
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      transactions: [],
    },
    message: '',
  },
  vendoPackage: {
    status: 0,
    data: { packages: [], package_level: '', vqRatio: 0, vqs: 0, status: 0 },
    message: '',
  },
  wallet: { status: 0, data: { wallet: {}, pendings: [] }, message: '' },
};

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const updateWalletAddress = createAsyncThunk(
  'wallet/update',
  async (wallet: string, { dispatch}) => {
    try {
      const { data } = await axios.post(
        `${api}/wallet/create`,
        {
          payment_method: 'coinpayment', // temporarily static
          wallet_address: wallet,
        },
        config
      );
      dispatch(updateUserWalletId(wallet));
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return {
        title: 'Could not update wallet',
        errorMsg: error?.response?.data?.message ?? error.message,
      };
    }
  }
);

export const requestPayout = createAsyncThunk(
  'wallet/payout',
  async ({ amount, points } : {amount:string, points: string}, { dispatch, getState }) => {
    try {
      const state = getState() as { user: { data: { rank: { balance: string } } } };
      const userPoints = state.user.data.rank.balance;
      const userAmount = parseFloat(amount);
      const { data } = await axios.post(
        `${api}/wallet/create/transaction`,
        {
          payment_method: 'coinpayment', // temporarily static
          amount: userAmount,
          currency: '$USD',
        },
        config
      );
      // update the transactions list
      dispatch(updateWalletTransactions(data.data.transaction));
      // deduct the requested points
            dispatch(updateUserPoints(parseFloat((parseFloat(userPoints) - parseFloat(points)).toFixed(1))));
      return data;
    } catch (err) {
      return {
        title: 'Could not request payout',
        errorMsg: (err as Error).message,
      };
    }
  }
);

export const fetchWalletTransactions = createAsyncThunk(
  'wallet/transactions',
  async ({ page }: { page: number }, ) => {
    try {
      const { data } = await axios.get(`${api}/wallet/transactions?page=${page}&size=10`, config);
      return data;
    } catch (err) {
      return {
        title: 'Could not fetch transactions',
        errorMsg: (err as Error).message,
      };
    }
  }
);

export const fetchVendoPackageInfo = createAsyncThunk(
  'wallet/package',
  async ( ) => {
    try {
      const { data } = await axios.get(`${api1}/user/vendo/package-info`, config);
      return data;
    } catch (err) {
      return {
        title: 'Could not fetch package info',
        errorMsg: (err as Error).message,
      };
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletInput(state, action) {
      state.walletInput = action.payload;
    },
    updateTransactionPagination(state, action) {
      state.transactions.data.currentPage = action.payload.currentPage;
      state.transactions.data.totalItems = action.payload.totalItems;
      state.transactions.data.totalPages = action.payload.totalPages;
    },
    updateWalletTransactions(state, action) {
      state.transactions.data.transactions = state.transactions.data.transactions.concat(
        action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateWalletAddress.pending, (state) => {
        state.addWalletStatus = 'loading';
        state.error = {};
      })
      .addCase(updateWalletAddress.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.addWalletStatus = 'failed';
          state.error = action.payload;
          toast.error(action.payload.errorMsg);
        } else {
          state.addWalletStatus = 'succeeded';
          state.error = {};
          state.walletInput = '';
          toast.success('Wallet Added successfully!');
        }
      })
       .addCase(updateWalletAddress.rejected, (state, action) => {
        state.addWalletStatus = 'failed';
        state.error = action.payload as { title: string };
        toast.error((action.payload as { title: string }).title);
      })
      .addCase(requestPayout.pending, (state,) => {
        state.payoutStatus = 'loading';
        state.error = {};
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.payoutStatus = 'failed';
          state.error = action.payload;
          toast.error(action.payload.title);
        } else {
          state.payoutStatus = 'succeeded';
          state.error = {};
          toast.success(action.payload.message);
        }
      })
      .addCase(requestPayout.rejected, (state, action) => {
        state.payoutStatus = 'failed';
        state.error = action.payload as { title: string };
        toast.error((action.payload as { title: string }).title);
      })
      .addCase(fetchWalletTransactions.pending, (state,) => {
        state.payoutStatus = 'loading';
        state.error = {};
      })
      .addCase(fetchWalletTransactions.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.payoutStatus = 'failed';
          state.error = action.payload;
          //   toast.error(action.payload.title);
        } else {
          state.payoutStatus = 'succeeded';
          state.error = {};
          state.transactions = action.payload;
          //   toast.success("Payout request successfully sent!");
        }
      })
      .addCase(fetchWalletTransactions.rejected, (state, action) => {
        state.payoutStatus = 'failed';
        state.error = action.payload;
        // toast.error(action.payload.title);
      })
      .addCase(fetchVendoPackageInfo.pending, (state,) => {
        state.packageStatus = 'loading';
        state.error = {};
      })
      .addCase(fetchVendoPackageInfo.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.packageStatus = 'failed';
          state.error = action.payload;
        } else {
          state.packageStatus = 'succeeded';
          state.error = {};
          state.vendoPackage = action.payload;
        }
      })
      .addCase(fetchVendoPackageInfo.rejected, (state, action) => {
        state.packageStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const walletSelectAddStatus = (state: RootState) => state.wallet.addWalletStatus;
export const walletSelectPayoutStatus = (state: RootState) => state.wallet.payoutStatus;
export const walletSelectError = (state: RootState) => state.wallet.error;
// export const walletSelectSuccess = (state: RootState) => state.wallet.success;
export const walletSelectWalletInput = (state: RootState) => state.wallet.walletInput;
export const walletSelectTransactions = (state: RootState) => state.wallet.transactions.data;
export const { updateWalletInput, updateWalletTransactions } = walletSlice.actions;

export default walletSlice.reducer;
