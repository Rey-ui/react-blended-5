import { getUserInfo } from 'service/opencagedataApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency, latestRates } from 'service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/baseCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }
    try {
      const data = await getUserInfo(coords);
      return data.results[0].annotations.currency.iso_code;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchExchange = createAsyncThunk(
  'currency/exchange',
  async (credentials, thunkAPI) => {
    try {
      const data = await exchangeCurrency(credentials);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchLatestRates = createAsyncThunk(
  'currency/latestRates',
  async (baseCurrency, thunkAPI) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
