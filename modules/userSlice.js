import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  logined: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {},
    login: (state, action) => {},
    logout: (state, action) => {},
    check: (state, action) => {},
  },
});

export const {register, login, logout, check} = userSlice.actions;
