import { configureStore } from "@reduxjs/toolkit";
import user from "./Auth/auth";
import task from "./Task";
import rank from "./Rank";
import token from "./Token";
import general from "./General";
import walletReducer from "./Wallet/index";

export const store = configureStore({
  reducer: {
    user,
    task,
    rank,
    token,
    general,
    wallet: walletReducer,
  },
});
