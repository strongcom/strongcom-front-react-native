import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import SplashImage from '../resources/images/splash.png';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={SplashImage} style={styles.image} resizeMode={'contain'} />
      <Text variant={'headlineMedium'} style={styles.text}>
        나가기 전에 생각했나요?
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '40%',
    marginBottom: 24,
  },
  text: {
    fontWeight: 'bold',
  },
});
