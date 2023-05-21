import setCookie from 'set-cookie-parser';
import AsyncStorage from '@react-native-community/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const setCookieFromResponse = ({cookie}) => {
  console.log(cookie);
  const [accessToken, cookies] = setCookie.parse(cookie);

  AsyncStorage.setItem(
    'access_token',
    `access_token=${accessToken.value}`,
    () => console.log('done'),
  );
};

export const setAsyncData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};
export const getAsyncData = createAsyncThunk(
  'auth/getAsyncData',
  async key =>
    await AsyncStorage.getItem(key).then(value => {
      console.log(key, value);
      return value;
    }),
);
