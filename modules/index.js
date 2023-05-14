import {reminderSlice} from './reminderSlice';
import {SpringServer} from '../api/SpringServer';
import {inputStateSlice} from './inputStateSlice';
import authReducer from './authSlice';
import {FlaskServer} from '../api/FlaskServer';

const rootReducer = {
  reminder: reminderSlice.reducer,
  inputState: inputStateSlice.reducer,
  auth: authReducer,
  [SpringServer.reducerPath]: SpringServer.reducer,
  [FlaskServer.reducerPath]: FlaskServer.reducer,
};

export default rootReducer;
