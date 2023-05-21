import {FlatList, StyleSheet} from 'react-native';
import {settingList} from '../../resources/string';
import {Divider, List} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncData} from '../../lib/AsyncManager';
import {useDispatch} from 'react-redux';

export default function SettingList({navigation}) {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('refresh_token').then(() => {
      // navigation.navigate('Main');
      dispatch(getAsyncData('refresh_token'));
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
