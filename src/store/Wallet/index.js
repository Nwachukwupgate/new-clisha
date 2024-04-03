import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUserPoints, updateUserWalletId } from "../Auth/auth";
const api = process.env.REACT_APP_API_COMMERCE;
const api1 = process.env.REACT_APP_API;

const token = window.localStorage.getItem("token");

const initialState = {
  addWalletStatus: "idle",
  payoutStatus: "idle",
  packageStatus: "idle",
  error: {},
  walletInput: "",
  transactions: {
    status: false,
    data: {
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      transactions: [],
    },
    message: "",
  },
  wallet: {
    status: false,
    data: { wallet: {}, pendings: {} },
    message: "",
  },
  vendoPackage: { status: false, data: { packages: [] }, message: "" },
};

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const updateWalletAddress = createAsyncThunk(
  "wallet/update",
  async (wallet, { dispatch, getState }) => {
    try {
      const { data } = await axios.post(
        `${api}/wallet/create`,
        {
          payment_method: "coinpayment", // temporarily static
          wallet_address: wallet,
        },
        config
      );
      dispatch(updateUserWalletId(wallet));
      return data;
    } catch (err) {
      return {
        title: "Could not update wallet",
        errorMsg: err?.response?.data?.message ?? err.message,
      };
    }
  }
);

export const requestPayout = createAsyncThunk(
  "wallet/payout",
  async ({ amount, points }, { dispatch, getState }) => {
    try {
      const userPoints = getState().user.data.rank.balance;
      const userAmount = parseFloat(amount);
      const { data } = await axios.post(
        `${api}/wallet/create/transaction`,
        {
          payment_method: "coinpayment", // temporarily static
          amount: userAmount,
          currency: "$USD",
        },
        config
      );
      // update the transactions list
      dispatch(updateWalletTransactions(data.data.transaction));
      // deduct the requested points
      dispatch(
        updateUserPoints(
          (parseFloat(userPoints) - parseFloat(points)).toFixed(1)
        )
      );
      return data;
    } catch (err) {
      return {
        title: "Could not request payout",
        errorMsg: err.message,
      };
    }
  }
);

export const fetchWalletTransactions = createAsyncThunk(
  "wallet/transactions",
  async ({ page }, { dispatch, getState }) => {
    try {
      const { data } = await axios.get(
        `${api}/wallet/transactions?page=${page}&size=10`,
        config
      );
      return data;
    } catch (err) {
      return {
        title: "Could not fetch transactions",
        errorMsg: err.message,
      };
    }
  }
);

export const fetchVendoPackageInfo = createAsyncThunk(
  "wallet/package",
  async (emptyArg, { dispatch, getState }) => {
    try {
      const { data } = await axios.get(
        `${api1}/user/vendo/package-info`,
        config
      );
      return data;
    } catch (err) {
      return {
        title: "Could not fetch package info",
        errorMsg: err.message,
      };
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
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
      state.transactions.data.transactions =
        state.transactions.data.transactions.concat(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateWalletAddress.pending, (state, action) => {
        state.addWalletStatus = "loading";
        state.error = {};
      })
      .addCase(updateWalletAddress.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.addWalletStatus = "failed";
          state.error = action.payload;
          toast.error(action.payload.errorMsg);
        } else {
          state.addWalletStatus = "succeeded";
          state.error = {};
          state.walletInput = "";
          toast.success("Wallet Added successfully!");
        }
      })
      .addCase(updateWalletAddress.rejected, (state, action) => {
        state.addWalletStatus = "failed";
        state.error = action.payload;
        toast.error(action.payload.title);
      })
      .addCase(requestPayout.pending, (state, action) => {
        state.payoutStatus = "loading";
        state.error = {};
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.payoutStatus = "failed";
          state.error = action.payload;
          toast.error(action.payload.title);
        } else {
          state.payoutStatus = "succeeded";
          state.error = {};
          toast.success(action.payload.message);
        }
      })
      .addCase(requestPayout.rejected, (state, action) => {
        state.payoutStatus = "failed";
        state.error = action.payload;
        toast.error(action.payload.title);
      })
      .addCase(fetchWalletTransactions.pending, (state, action) => {
        state.payoutStatus = "loading";
        state.error = {};
      })
      .addCase(fetchWalletTransactions.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.payoutStatus = "failed";
          state.error = action.payload;
          //   toast.error(action.payload.title);
        } else {
          state.payoutStatus = "succeeded";
          state.error = {};
          state.transactions = action.payload;
          //   toast.success("Payout request successfully sent!");
        }
      })
      .addCase(fetchWalletTransactions.rejected, (state, action) => {
        state.payoutStatus = "failed";
        state.error = action.payload;
        // toast.error(action.payload.title);
      })
      .addCase(fetchVendoPackageInfo.pending, (state, action) => {
        state.packageStatus = "loading";
        state.error = {};
      })
      .addCase(fetchVendoPackageInfo.fulfilled, (state, action) => {
        if (action.payload.errorMsg) {
          state.packageStatus = "failed";
          state.error = action.payload;
        } else {
          state.packageStatus = "succeeded";
          state.error = {};
          state.vendoPackage = action.payload;
        }
      })
      .addCase(fetchVendoPackageInfo.rejected, (state, action) => {
        state.packageStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const walletSelectAddStatus = (state) => state.wallet.addWalletStatus;
export const walletSelectPayoutStatus = (state) => state.wallet.payoutStatus;
export const walletSelectError = (state) => state.wallet.error;
export const walletSelectSuccess = (state) => state.wallet.success;
export const walletSelectWalletInput = (state) => state.wallet.walletInput;
export const walletSelectTransactions = (state) =>
  state.wallet.transactions.data;

export const { updateWalletInput, updateWalletTransactions } =
  walletSlice.actions;

export default walletSlice.reducer;
