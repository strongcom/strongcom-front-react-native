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
import {ko, registerTranslation} from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';
import theme from './resources/style/theme';
import {
  NotificationListener,
  requestUserPermission,
} from './lib/pushNotificationManager';

registerTranslation('ko', ko);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(RTXquery.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  useEffect(() => {
    requestUserPermission().then(r => NotificationListener());
  }, []);
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
