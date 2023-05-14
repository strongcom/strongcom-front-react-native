import {Image, StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import theme from '../resources/style/theme';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {usePostImageMutation} from '../api/FlaskServer';

export default function ImageAddScreen() {
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
  const [type, setType] = useState('image/jpeg');
  const [name, setName] = useState('title');
  const [postImage] = usePostImageMutation();

  const handleImageClick = () => {
    launchImageLibrary(options, response => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else {
        console.log(response?.assets[0].uri);
        setImage(response?.assets[0].uri);
        setType(response?.assets[0].type);
        setName(response?.assets[0].fileName);
      }
    }).then(r => console.log('successfully'));
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

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer} onPress={handleImageClick}>
        <Image
          style={
            image === initImageUrl ? styles.defaultCardCover : styles.cardCover
          }
          source={{uri: image}}
        />
      </Card>
      <View>
        <Button icon="content-save" mode="contained" onPress={handlePostImage}>
          사진 저장하기
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.elevation.level0,
    padding: 16,
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
});
