import {ListItem} from '@react-native-material/core';
import {FlatList, Text} from 'react-native';
import {useGetReminderQuery} from '../../api/jsonApi';
import {StyleSheet} from 'react-native';

export default function TaskList() {
  const {data, error, isLoading} = useGetReminderQuery('today');

  if (isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Text>Error...</Text>
      </>
    );
  }

  return (
    <>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({item}) => (
          <ListItem title={item.title} secondaryText={item.subTitle} />
        )}
        keyExtractor={item => item._id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});
