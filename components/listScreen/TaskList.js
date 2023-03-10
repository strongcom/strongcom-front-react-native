import {FlatList, Text} from 'react-native';
import {useGetReminderListQuery} from '../../api/RTXquery';
import {StyleSheet} from 'react-native';
import {Divider, List} from 'react-native-paper';
import theme from '../../resources/style/theme';

export default function TaskList({filter}) {
  const {data, error, isLoading} = useGetReminderListQuery(filter);

  // const {data, error, isLoading} = useGetReminderListQuery(filter);

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
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <List.Item
            title={item?.title}
            description={item?.subTitle}
            left={() => (
              <List.Icon
                style={styles.listLeft}
                color={theme.colors.primary}
                icon={'reminder'}
              />
            )}
          />
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
  listLeft: {
    backgroundColor: theme.colors.primaryContainer,
    padding: 8,
    borderRadius: 16,
  },
});
