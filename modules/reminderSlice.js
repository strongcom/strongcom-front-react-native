import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import * as reminderApi from '../api/reminder';

const initialState = {
  title: '',
  content: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  startTime: dayjs().format('HH:mm:ss'),
  endTime: dayjs().format('HH:mm:ss'),
  RepetitionPeriod: '',
  RepetitionDay: '',
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
      // let payloadTime = dayjs(action.payload);
      // state.startDate = dayjs(state.startDate)
      //   .set('hour', payloadTime.get('hour'))
      //   .set('minute', payloadTime.get('minute'))
      //   .set('second', payloadTime.get('second'))
      //   .format();
    },
    endTimeInput: (state, action) => {
      state.endTime = action.payload;
      // let payloadTime = dayjs(action.payload);
      // state.endDate = dayjs(state.endDate)
      //   .set('hour', payloadTime.get('hour'))
      //   .set('minute', payloadTime.get('minute'))
      //   .set('second', payloadTime.get('second'))
      //   .format();
    },
    RepetitionPeriodInput: (state, action) => {
      state.RepetitionPeriod = action.payload;
    },
    RepetitionDayInput: (state, action) => {
      state.RepetitionDay = state.RepetitionDay + ` ${action.payload}`;
    },
    RepetitionCancel: state => {
      state.RepetitionPeriod = '';
      state.RepetitionDay = '';
    },
    initReminder: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postReminderAsync.pending, state => {})
      .addCase(postReminderAsync.fulfilled, (state, action) => {})
      .addCase(postReminderAsync.rejected, (state, action) => {});
  },
});

export const postReminderAsync = createAsyncThunk(
  'reminder/postReminderStatus',
  async (newReminder, thunkAPI) => {
    const response = await reminderApi.postReminder(newReminder);
    return response.data;
  },
);

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
