import {FlatList, StyleSheet, Text} from 'react-native';
import {settingList} from '../../resources/string';
import {Stack} from '@react-native-material/core';
import {Divider} from 'react-native-paper';
import {List} from 'react-native-paper';
import theme from '../../resources/style/theme';
import {useNavigation} from '@react-navigation/native';

export default function SettingList() {
  const navigation = useNavigation();
  //todo: 로그인 화면으로 넘어갔을 때 앱바 뒤로가기 비활성화하기
  return (
    <>
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        style={styles.listWrapper}
        data={settingList}
        renderItem={({item}) => (
          <List.Item
            title={item.menuName}
            onPress={() => navigation.navigate('Login')}
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
