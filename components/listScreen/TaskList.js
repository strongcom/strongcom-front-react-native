import {ListItem} from '@react-native-material/core';
import {FlatList, Text} from 'react-native';
import {useGetReminderQuery} from '../../api/jsonApi';

export default function TaskList() {
  const {data, error, isLoading} = useGetReminderQuery('today');

  if (isLoading) {
    return (
      <>
        <Text>'Loading...'</Text>
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
        data={data}
        renderItem={({item}) => <ListItem title={item.title} />}
        keyExtractor={item => item._id}
      />
    </>
  );
}
