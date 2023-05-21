import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {usePostUsernameMutation} from '../api/SpringServer';
import theme from '../resources/style/theme';
import showToast from '../lib/showToast';
import {getAsyncData, setAsyncData} from '../lib/AsyncManager';
import {useDispatch} from 'react-redux';
import {setImageInput} from '../modules/inputStateSlice';

export default function RegisterScreen({navigation, route}) {
  const {refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt} =
    route.params;
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [postUsername] = usePostUsernameMutation();

  const handleRegistration = async () => {
    const {data, error} = await postUsername(username);
    if (error) {
      showToast({
        type: 'error',
        text1: 'username 등록 실패',
        text2: error,
      });
    } else {
      await setAsyncData('refresh_token', refreshToken);
      await setAsyncData('access_token_expires_at', accessTokenExpiresAt);
      await setAsyncData('refresh_token_expires_at', refreshTokenExpiresAt);
      dispatch(getAsyncData('refresh_token'));
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          label="username"
          mode="outlined"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => handleRegistration()}>
        등록
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.elevation.level0,
    padding: 16,
  },
  textInput: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
});

const vaildationStyle = vaildation =>
  StyleSheet.create({
    vaildationText: {
      margin: 4,
      color: vaildation ? '#e53935' : 'black',
    },
  });
