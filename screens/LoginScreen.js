import {Button} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useKakaoLoginMutation} from '../api/SpringServer';
import theme from '../resources/style/theme';
import {login, loginWithKakaoAccount} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncData, setAsyncData} from '../lib/AsyncManager';
import {setImageInput} from '../modules/inputStateSlice';
import {useDispatch} from 'react-redux';

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
    const token = await loginWithKakaoAccount();
    const {data, error} = await kakaoLogin({
      ...token,
      targetToken: await AsyncStorage.getItem('fcmToken'),
    });
    if (error) {
      showToast();
    } else {
      await setAsyncData('access_token', token.accessToken);
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
        <View style={styles.center}>
          <Text style={styles.titleText}>나가기 전에 생각했나요?</Text>
        </View>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => signInWithKakao()}>
          카카오 로그인
        </Button>
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
  textInput: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
