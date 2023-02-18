import {reminderSlice} from './reminderSlice';
import {RTXquery} from '../api/RTXquery';
import {inputStateSlice} from './inputStateSlice';
import {userSlice} from './userSlice';

const rootReducer = {
  reminder: reminderSlice.reducer,
  inputState: inputStateSlice.reducer,
  user: userSlice.reducer,
  [RTXquery.reducerPath]: RTXquery.reducer,
};

export default rootReducer;
