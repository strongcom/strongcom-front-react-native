import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useKakaoLoginMutation} from '../api/SpringServer';
import theme from '../resources/style/theme';
import {login} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncData, setAsyncData} from '../lib/AsyncManager';
import {setImageInput} from '../modules/inputStateSlice';
import {useDispatch} from 'react-redux';
import SplashImage from '../resources/images/splash.png';
import KakaoLoginButton from '../resources/images/kakao_login_button.png';

export default function LoginScreen({navigation}) {
  const [kakaoLogin] = useKakaoLoginMutation();
  const dispatch = useDispatch();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: '로그인 실패',
      topOffset: 70,
    });
  };

  const signInWithKakao = async () => {
    const token = await login()
      // const token = await loginWithKakaoAccount()
      .then(async response => {
        await setAsyncData('access_token', response.accessToken);
        return response;
      })
      .catch(e => showToast());
    console.log(await AsyncStorage.getItem('fcmToken'));
    const {data, error} = await kakaoLogin({
      ...token,
      accessToken: `Bearer ${token.accessToken}`,
      targetToken: await AsyncStorage.getItem('fcmToken'),
    });
    if (error) {
      showToast();
    } else {
      if (data) {
        dispatch(setImageInput(false));
        navigation.navigate('Register', {...token});
      } else {
        await setAsyncData('refresh_token', token.refreshToken);
        await setAsyncData(
          'access_token_expires_at',
          token.accessTokenExpiresAt,
        );
        await setAsyncData(
          'refresh_token_expires_at',
          token.refreshTokenExpiresAt,
        );
        dispatch(getAsyncData('refresh_token'));
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={SplashImage}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View style={styles.center}>
          <Text style={styles.titleText}>나가기 전에 생각했나요?</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={signInWithKakao}
          resizeMode={'contain'}>
          <Image source={KakaoLoginButton} style={styles.imageBackground} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.elevation.level0,
    marginHorizontal: 16,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 8,
  },
  button: {
    width: 300,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  image: {
    height: '40%',
  },
});
