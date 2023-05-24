import TaskList from '../components/listScreen/TaskList';
import {AnimatedFAB} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../resources/style/theme';
import {useCallback, useEffect, useState} from 'react';
import {useGetReminderListQuery} from '../api/SpringServer';

export default function ListScreen({navigation}) {
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
    <View style={styles.container}>
      <TaskList
        data={data}
        error={error}
        isLoading={isLoading}
        filter={''}
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
    </View>
  );
}
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
