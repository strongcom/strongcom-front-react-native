import setCookie from 'set-cookie-parser';
import AsyncStorage from '@react-native-community/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {async} from '@babel/runtime/regenerator';

export const setCookieFromResponse = ({cookie}) => {
  console.log(cookie);
  const [accessToken, cookies] = setCookie.parse(cookie);

  AsyncStorage.setItem(
    'access_token',
    `access_token=${accessToken.value}`,
    () => console.log('done'),
  );
};
// export const getAsyncData = async key =>
//   await AsyncStorage.getItem(key).then(cookies => cookies);

export const getAsyncData = createAsyncThunk(
  'auth/getAsyncData',
  async key =>
    await AsyncStorage.getItem(key).then(cookies => {
      console.log('cookies', cookies);
      return cookies;
    }),
);
