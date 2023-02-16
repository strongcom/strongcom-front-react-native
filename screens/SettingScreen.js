import {Text} from 'react-native';
import SettingList from '../components/settingScreen/SettingList';
import UserProfile from '../components/settingScreen/UserProfile';

export default function SettingScreen() {
  return (
    <>
      <UserProfile />
      <SettingList />
    </>
  );
}
