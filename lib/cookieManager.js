import CookieManager from '@react-native-cookies/cookies';
import setCookie from 'set-cookie-parser';
import AsyncStorage from '@react-native-community/async-storage';

const baseUrl = 'http://10.0.2.2:8080/api/';

export const setCookieFromResponse = ({cookie}) => {
  const cookies = setCookie.parse(cookie).at(0);
  console.log(cookies.value);
  AsyncStorage.setItem('access_token', `access_token=${cookies.value}`, () =>
    console.log('done'),
  );
  // CookieManager.set(baseUrl, {
  //   name: cookies.name,
  //   value: cookies.value,
  //   path: cookies.path,
  //   httpOnly: cookies.httpOnly,
  // })
  //   .then(() =>
  //     AsyncStorage.setItem('access_token', cookies.value, () =>
  //       console.log('done'),
  //     ),
  //   )
  //   .catch(e => console.log(e));
};
