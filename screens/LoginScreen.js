import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function LoginScreen() {
  const [text, setText] = useState('');

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
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => console.log('Login Button Click')}>
          로그인
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 200,
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
