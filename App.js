import React, {useEffect} from 'react';
import ManageNavigation from './screens/ManageNavigation';
//redux 관련
import rootReducer from './modules';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {RTXquery} from './api/RTXquery';
//style 관련
import {Provider as PaperProvider} from 'react-native-paper';
import {LogBox} from 'react-native';
import {ko, registerTranslation} from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';
import theme from './resources/style/theme';

registerTranslation('ko', ko);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(RTXquery.middleware, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  return (
    <>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <ManageNavigation />
          <Toast />
        </PaperProvider>
      </Provider>
    </>
  );
}

export default App;
