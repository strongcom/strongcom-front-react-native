import {TextInput, Button} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {registerUser, setUserInfo} from '../modules/authSlice';
import {useLoginMutation, userLoginMutation} from '../api/SpringServer';
import {useDispatch} from 'react-redux';
import theme from '../resources/style/theme';
import {getAsyncData, setCookieFromResponse} from '../lib/cookieManager';
import {CommonActions} from '@react-navigation/native';

export default function LoginScreen({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: '로그인 실패',
      topOffset: 70,
    });
  };

  const handleLogin = async () => {
    const {data, error} = await login({
      username: id,
      password: password,
    });
    dispatch(setUserInfo({data, error}));
    if (error) {
      showToast();
    } else {
      setCookieFromResponse({cookie: data.cookie});
      dispatch(getAsyncData('access_token'));
      // navigation.navigate('Main');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.titleText}>나가기 전에 생각했나요?</Text>
        </View>
        <TextInput
          style={styles.textInput}
          label="ID"
          mode="outlined"
          value={id}
          onChangeText={text => setId(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={passwordHide}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordHide(!passwordHide)}
            />
          }
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleLogin()}>
          로그인
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.navigate('Register')}>
          회원가입
        </Button>
        {/*<Button*/}
        {/*  style={styles.button}*/}
        {/*  mode="outlined"*/}
        {/*  onPress={() => navigation.navigate('Main')}>*/}
        {/*  쿠키 테스트*/}
        {/*</Button>*/}
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
