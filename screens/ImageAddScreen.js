import {StyleSheet, View, Image} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import theme from '../resources/style/theme';
import {useState} from 'react';
import logger from 'redux-logger';

export default function ImageAddScreen() {
  const initImageUrl =
    'https://cdn-icons-png.flaticon.com/512/3566/3566345.png';
  const [image, setImage] = useState(initImageUrl);
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer} onPress={() => console.log('누름')}>
        <Image
          style={
            image === initImageUrl ? styles.defaultCardCover : styles.cardCover
          }
          source={{uri: image}}
        />
      </Card>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          onPress={() => console.log('Pressed')}>
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
    height: 600,
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
