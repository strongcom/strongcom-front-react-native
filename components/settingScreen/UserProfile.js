import {StyleSheet, Text, View} from 'react-native';
import {useGetUserInfoQuery} from '../../api/SpringServer';
import {Avatar} from 'react-native-paper';
import SplashImage from '../../resources/images/splash.png';

export default function UserProfile() {
  const {data, error, isLoading} = useGetUserInfoQuery();
  return (
    <>
      <View style={styles.userAgent}>
        <Avatar.Image
          size={100}
          source={isLoading || error ? SplashImage : {uri: data?.image_url}}
        />
        <Text style={styles.userName}>
          {isLoading ? '로딩중...' : error ? error.message : data.nickName}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userAgent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  userName: {
    fontSize: 24,
    marginTop: 12,
  },
  avatar: {
    width: 100,
    height: 100,
  },
});
