import React, {useEffect} from 'react';
import ManageNavigation from './screens/ManageNavigation';
//redux 관련
import rootReducer from './modules';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {RTXquery} from './api/RTXquery';
//style 관련
import {LogBox} from 'react-native';
import {ko, registerTranslation} from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';

registerTranslation('ko', ko);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(RTXquery.middleware, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  return (
    <>
      <Provider store={store}>
        <ManageNavigation />
        <Toast />
      </Provider>
    </>
  );
}

export default App;
