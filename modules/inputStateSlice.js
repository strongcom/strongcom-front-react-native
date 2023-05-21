import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dateToggle: false,
  timeToggle: false,
  selectModToggle: false,
  imageInput: true,
};

export const inputStateSlice = createSlice({
  name: 'inputState',
  initialState,
  reducers: {
    dateToggleInput: (state, action) => {
      state.dateToggle = action.payload;
    },
    timeToggleInput: (state, action) => {
      state.timeToggle = action.payload;
    },
    initAddPageToggleState: state => {
      state.dateToggle = false;
      state.timeToggle = false;
    },
    setSelectModToggle: (state, action) => {
      state.selectModToggle = action.payload;
    },
    setImageInput: (state, action) => {
      console.log('dispatch?????????');
      state.imageInput = action.payload;
    },
  },
});

export const {
  dateToggleInput,
  timeToggleInput,
  initAddPageToggleState,
  setSelectModToggle,
  setImageInput,
} = inputStateSlice.actions;
