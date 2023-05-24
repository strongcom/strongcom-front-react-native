import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import theme from '../resources/style/theme';
import TaskList from '../components/listScreen/TaskList';
import {useGetReminderListQuery} from '../api/SpringServer';
import {AnimatedFAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const {data, error, isLoading, refetch, isFetching} =
    useGetReminderListQuery('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(isFetching);
  }, [isFetching]);
  return (
    <SafeAreaView style={styles.container}>
      <TaskList
        data={data}
        error={error}
        isLoading={isLoading}
        filter="today"
        title="오늘의 리마인더"
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <AnimatedFAB
        icon={() => <Icon name="add" size={24} color={'black'} />}
        label={'Label'}
        extended={false}
        onPress={() => navigation.navigate('Add')}
        iconMode={'static'}
        style={styles.fabStyle}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.elevation.level0,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
