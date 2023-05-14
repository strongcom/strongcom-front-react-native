import {FlatList, StyleSheet} from 'react-native';
import {settingList} from '../../resources/string';
import {Divider, List} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncData} from '../../lib/cookieManager';
import {useDispatch} from 'react-redux';

export default function SettingList({navigation}) {
  const dispatch = useDispatch();
  //todo: 로그인 화면으로 넘어갔을 때 앱바 뒤로가기 비활성화하기
  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token').then(() => {
      // navigation.navigate('Main');
      dispatch(getAsyncData('access_token'));
    });
  };

  const handleImageAdd = () => {
    navigation.navigate('ImageAdd');
  };

  return (
    <>
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        style={styles.listWrapper}
        data={settingList}
        renderItem={({item}) => (
          <List.Item
            title={item.menuName}
            onPress={
              item.key === 0
                ? handleLogout
                : item.key === 2
                ? handleImageAdd
                : null
            }
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    margin: 16,
  },
  menuTitle: {
    fontSize: 20,
    margin: 8,
  },
  divider: {
    margin: 4,
  },
});
