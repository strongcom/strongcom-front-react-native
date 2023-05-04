import {reminderSlice} from './reminderSlice';
import {SpringServer} from '../api/SpringServer';
import {inputStateSlice} from './inputStateSlice';
import {userSlice} from './userSlice';
import {FlaskServer} from '../api/FlaskServer';

const rootReducer = {
  reminder: reminderSlice.reducer,
  inputState: inputStateSlice.reducer,
  user: userSlice.reducer,
  [SpringServer.reducerPath]: SpringServer.reducer,
  [FlaskServer.reducerPath]: FlaskServer.reducer,
};

export default rootReducer;
