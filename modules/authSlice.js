import {createSlice} from '@reduxjs/toolkit';
import {getAsyncData} from '../lib/cookieManager';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      if (action.payload.error) {
        state.logined = false;
        return;
      }
      state.logined = true;
      state.userId = action.payload.data?.userId;
    },
    setLoginState: (state, action) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(getAsyncData.pending, state => {
        state.loading = true;
      })
      .addCase(getAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = !!action.payload;
      })
      .addCase(getAsyncData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setUserInfo} = authSlice.actions;
export default authSlice.reducer;
