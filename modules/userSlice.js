import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  logined: false,
  userId: '',
};

export const userSlice = createSlice({
  name: 'user',
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
  },
});

export const {setUserInfo} = userSlice.actions;
