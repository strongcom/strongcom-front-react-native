import React, {useEffect} from 'react';
import ManageNavigation from './navigation/ManageNavigation';
//redux 관련
import rootReducer from './modules';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {SpringServer} from './api/SpringServer';
//style 관련
import {Provider as PaperProvider} from 'react-native-paper';
import {ko, registerTranslation} from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';
import theme from './resources/style/theme';
import {
  NotificationListener,
  requestUserPermission,
} from './lib/pushNotificationManager';
import {FlaskServer} from './api/FlaskServer';
import {logger} from 'redux-logger/src';

registerTranslation('ko', ko);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      FlaskServer.middleware,
      SpringServer.middleware,
      logger,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  useEffect(() => {
    requestUserPermission().then(r => NotificationListener());
    // AsyncStorage.removeItem('access_token');
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
