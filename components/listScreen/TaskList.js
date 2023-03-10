import {FlatList, Text} from 'react-native';
import {useGetReminderListQuery} from '../../api/RTXquery';
import {StyleSheet} from 'react-native';
import {Divider, List} from 'react-native-paper';
import theme from '../../resources/style/theme';
import {useNavigation} from '@react-navigation/native';

export default function TaskList({filter}) {
  const {data, error, isLoading} = useGetReminderListQuery(filter);
  const navigation = useNavigation();

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
            onPress={() =>
              navigation.navigate({name: 'Add', params: {reminder: item}})
            }
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
