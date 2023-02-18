import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function LoginScreen({navigation}) {
  const [text, setText] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);

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
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
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
          onPress={() => console.log('Login Button Click')}>
          로그인
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.navigate('Register')}>
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
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
