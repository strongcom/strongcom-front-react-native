import {createSlice} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  title: '',
  content: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  startTime: dayjs().format('HH:mm:ss'),
  endTime: dayjs().format('HH:mm:ss'),
  repetitionPeriod: '',
  repetitionDay: [],
};

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    titleInput: (state, action) => {
      state.title = action.payload;
    },
    contentInput: (state, action) => {
      state.content = action.payload;
    },
    startDateInput: (state, action) => {
      state.startDate = action.payload;
    },
    endDateInput: (state, action) => {
      state.endDate = action.payload;
    },
    startTimeInput: (state, action) => {
      state.startTime = action.payload;
    },
    endTimeInput: (state, action) => {
      state.endTime = action.payload;
    },
    RepetitionPeriodInput: (state, action) => {
      state.repetitionPeriod = action.payload;
    },
    RepetitionDayInput: (state, action) => {
      if (!state.repetitionDay.includes(action.payload)) {
        state.repetitionDay = [...state.repetitionDay, action.payload];
      } else {
        state.repetitionDay = state.repetitionDay.filter(
          v => v !== action.payload,
        );
      }
    },
    RepetitionCancel: state => {
      state.repetitionPeriod = '';
      state.repetitionDay = '';
    },
    initReminder: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  titleInput,
  contentInput,
  startDateInput,
  endDateInput,
  startTimeInput,
  endTimeInput,
  RepetitionPeriodInput,
  RepetitionDayInput,
  RepetitionCancel,
  initReminder,
} = reminderSlice.actions;
