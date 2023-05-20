import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {usePostUsernameMutation} from '../api/SpringServer';
import {useDispatch} from 'react-redux';
import theme from '../resources/style/theme';
import {usePostImageMutation} from '../api/FlaskServer';
import {launchImageLibrary} from 'react-native-image-picker';
import showToast from '../lib/showToast';

export default function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [postUsername] = usePostUsernameMutation();
  const initImageUrl =
    'https://cdn-icons-png.flaticon.com/512/3566/3566345.png';
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
      selectionLimit: 1,
      mediaType: 'image',
      includeBase64: false,
    },
  };
  const [image, setImage] = useState(initImageUrl);
  const [type, setType] = useState(null);
  const [name, setName] = useState(null);
  const [postImage] = usePostImageMutation();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    launchImageLibrary(options, response => {
      if (response.error) {
        showToast({
          error: 'error',
          text1: '갤러리 불러오기 오류 발생',
          text2: response.error,
        });
      }
    })
      .then(response => {
        setImage(response?.assets[0]?.uri);
        setType(response?.assets[0]?.type);
        setName(response?.assets[0]?.fileName);
      })
      .catch(e => {
        if (!name) {
          showToast({
            error: 'error',
            text1: '이미지를 선택해주세요',
            text2: e,
          });
        }
      });
  };

  const handlePostImage = async () => {
    const form = new FormData();
    form.append('file', {
      uri: image,
      type: type,
      name: name,
    });
    form.append('userid', 'ksumin');
    const request = await postImage(form);
    console.log(request);
  };

  const handleRegistration = async () => {
    const {data, error} = await postUsername({
      username: username,
    });
    if (error) {
      showToast();
    } else {
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
        <Card style={styles.cardContainer} onPress={handleImageClick}>
          <Image
            style={
              image === initImageUrl
                ? styles.defaultCardCover
                : styles.cardCover
            }
            source={{uri: image}}
          />
        </Card>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleRegistration()}>
          등록
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
  cardContainer: {
    height: '80%',
    marginBottom: 16,
  },
  cardCover: {
    height: '100%',
    resizeMode: 'contain',
  },
  defaultCardCover: {
    height: '100%',
    resizeMode: 'contain',
    marginHorizontal: 40,
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
