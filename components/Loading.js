import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require('../resources/images/loading.gif')}
        resizeMode={'cover'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
