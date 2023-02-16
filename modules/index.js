import {reminderSlice} from './reminderSlice';
import {jsonApi} from '../api/jsonApi';
import {inputStateSlice} from './inputStateSlice';

const rootReducer = {
  reminder: reminderSlice.reducer,
  inputState: inputStateSlice.reducer,
  [jsonApi.reducerPath]: jsonApi.reducer,
};

export default rootReducer;
