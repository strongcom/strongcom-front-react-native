import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import theme from '../resources/style/theme';
import {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {usePostImageMutation} from '../api/FlaskServer';
import showToast from '../lib/showToast';
import {
  useGetReminderListQuery,
  useGetUserInfoQuery,
} from '../api/SpringServer';
import {getAsyncData, setAsyncData} from '../lib/AsyncManager';
import {useDispatch} from 'react-redux';
import {setImageInput} from '../modules/inputStateSlice';

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
  const {data: userInfo, error, isLoading} = useGetUserInfoQuery();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    launchImageLibrary(options, response => {
      if (response.error) {
        showToast({
          type: 'error',
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
            type: 'error',
            text1: '이미지를 선택해주세요',
            text2: e,
          });
        }
      });
  };

  const handlePostImage = async () => {
    try {
      const form = new FormData();
      form.append('file', {
        uri: image,
        type: type,
        name: name,
      });
      console.log(userInfo);
      form.append('userid', userInfo.userName || 'ksumin');
      await postImage(form);
      // TODO 서버 연결되면 아래 코드 실행하기
      await setAsyncData('image_input', image);
      dispatch(getAsyncData('image_input'));
    } catch (e) {
      showToast({type: 'error', text1: '이미지 등록 오류', text2: e});
    } finally {
      // TODO 서버 연결 전에는 플로우를 위해 finally 사용
      dispatch(setImageInput(true));
    }
  };

  if (isLoading) {
    return <Text>{'로딩중'}</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

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
