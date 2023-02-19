import React from 'react';
import {StyleSheet, View} from 'react-native';

function HomeScreen() {
  return <View style={styles.container}></View>;
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFCF3',
  },
});
