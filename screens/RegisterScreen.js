import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {useRegisterUserMutation} from '../api/SpringServer';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../modules/userSlice';
import theme from '../resources/style/theme';
import AsyncStorage from '@react-native-community/async-storage';

export default function RegisterScreen({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [register, {isLoading}] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: '회원가입에 실패했습니다.',
      topOffset: 70,
    });
  };

  const handleRegistration = async () => {
    if (password === checkPassword) {
      const {data, error} = await register({
        username: id,
        password: password,
        targetToken: await AsyncStorage.getItem('fcmToken'),
      });
      dispatch(setUserInfo({data, error}));
      if (error) {
        showToast();
      } else {
        navigation.navigate('Main');
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          label="아이디"
          mode="outlined"
          value={id}
          onChangeText={text => setId(text)}
        />
        <TextInput
          style={styles.textInput}
          label="비밀번호"
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
        <View style={styles.textInput}>
          <TextInput
            label="비밀번호 확인"
            mode="outlined"
            value={checkPassword}
            onChangeText={text => setCheckPassword(text)}
            secureTextEntry={passwordHide}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setPasswordHide(!passwordHide)}
              />
            }
          />
          {password !== checkPassword && (
            <Text
              style={
                vaildationStyle(password !== checkPassword).vaildationText
              }>
              {password !== checkPassword && '비밀번호가 다릅니다.'}
            </Text>
          )}
        </View>
        <TextInput
          style={styles.textInput}
          label="이름"
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleRegistration()}>
          회원가입
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
  },
  titleText: {
    fontSize: 24,
    marginBottom: 16,
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

const vaildationStyle = vaildation =>
  StyleSheet.create({
    vaildationText: {
      margin: 4,
      color: vaildation ? '#e53935' : 'black',
    },
  });
