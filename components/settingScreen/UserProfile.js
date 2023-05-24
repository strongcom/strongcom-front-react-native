import {StyleSheet, Text, View} from 'react-native';
import {useGetUserInfoQuery} from '../../api/SpringServer';

export default function UserProfile() {
  const {data, error, isLoading} = useGetUserInfoQuery();
  return (
    <>
      <View style={styles.userAgent}>
        {/*<Avatar*/}
        {/*  size={100}*/}
        {/*  image={{*/}
        {/*    uri: 'https://blog.kakaocdn.net/dn/bAiTQP/btquRcLlEU9/soHQmOD9kzfvNT2v5WXSF1/img.jpg',*/}
        {/*  }}*/}
        {/*/>*/}
        <Text style={styles.userName}>
          ID: {isLoading ? '로딩중...' : error ? error.message : data.userName}
        </Text>
        <Text style={styles.userName}>
          닉네임:{' '}
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
