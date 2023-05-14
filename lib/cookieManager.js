import setCookie from 'set-cookie-parser';
import AsyncStorage from '@react-native-community/async-storage';

export const setCookieFromResponse = ({cookie}) => {
  console.log(cookie);
  const [accessToken, cookies] = setCookie.parse(cookie);

  AsyncStorage.setItem(
    'access_token',
    `access_token=${accessToken.value}`,
    () => console.log('done'),
  );
};
export const getCookie = async () =>
  await AsyncStorage.getItem('access_token').then(cookies => cookies);
