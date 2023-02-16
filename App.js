import React, {useEffect} from 'react';
import AppBar from './components/AppBar';
//redux 관련
import rootReducer from './modules';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {jsonApi} from './api/jsonApi';
//style 관련
import {ThemeProvider} from 'styled-components';
import theme from './resources/style/theme';
import {LogBox} from 'react-native';
import {ko, registerTranslation} from 'react-native-paper-dates';

registerTranslation('ko', ko);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(jsonApi.middleware, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppBar />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
