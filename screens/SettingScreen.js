import {StyleSheet, View} from 'react-native';
import SettingList from '../components/settingScreen/SettingList';
import UserProfile from '../components/settingScreen/UserProfile';
import theme from '../resources/style/theme';

export default function SettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <UserProfile />
      <SettingList navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.elevation.level0,
  },
});
