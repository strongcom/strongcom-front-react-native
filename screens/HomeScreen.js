import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../resources/style/theme';
import {Divider, Text} from 'react-native-paper';
import TaskList from '../components/listScreen/TaskList';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <TaskList filter={''} title={'오늘의 리마인더'} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.elevation.level0,
  },
});
