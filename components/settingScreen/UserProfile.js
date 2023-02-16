import {Image, StyleSheet, View} from 'react-native';
import {Avatar} from '@react-native-material/core';
import {Text} from 'react-native';
export default function UserProfile() {
  return (
    <>
      <View style={styles.userAgent}>
        <Avatar
          size={100}
          image={{
            uri: 'https://blog.kakaocdn.net/dn/bAiTQP/btquRcLlEU9/soHQmOD9kzfvNT2v5WXSF1/img.jpg',
          }}
        />
        <Text style={styles.userName}>괴도키드</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userAgent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  userName: {
    fontSize: 24,
    margin: 12,
  },
  avatar: {
    width: 100,
    height: 100,
  },
});
