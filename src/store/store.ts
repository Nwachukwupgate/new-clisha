import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './Auth/auth';
import task from './Task';
import rank from './Rank';
import token from './Token';
import general from './General';
import walletReducer from './Wallet/index';

const rootReducer = combineReducers({
  user,
  task,
  rank,
  token,
  general,
  wallet: walletReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Create a RootState type using the store's state
export type RootState = ReturnType<typeof store.getState>;

// Create an AppDispatch type using the store's dispatch
export type AppDispatch = typeof store.dispatch;
