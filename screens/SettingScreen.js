import {View, StyleSheet} from 'react-native';
import SettingList from '../components/settingScreen/SettingList';
import UserProfile from '../components/settingScreen/UserProfile';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <UserProfile />
      <SettingList />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
