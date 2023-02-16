import {FlatList, StyleSheet, Text} from 'react-native';
import {settingList} from '../../resources/string';
import {Stack} from '@react-native-material/core';
import {Divider} from 'react-native-paper';
function MenuItem({menu}) {
  return (
    <>
      <Stack key={menu.key}>
        <Text style={styles.menuTitle}>{menu.menuName}</Text>
        <Divider style={styles.divider} />
        {menu?.subMenu ? (
          <>
            {menu.subMenu.map(menu => (
              <Text style={styles.subtitle} key={menu.key}>
                {menu.menuName}
              </Text>
            ))}
            <Divider />
          </>
        ) : null}
      </Stack>
    </>
  );
}

export default function SettingList() {
  return (
    <>
      <FlatList
        style={styles.listWrapper}
        data={settingList}
        renderItem={({item}) => <MenuItem menu={item} />}
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
  subtitle: {
    fontSize: 16,
    margin: 8,
    color: 'gray',
  },
  divider: {
    margin: 4,
  },
});
