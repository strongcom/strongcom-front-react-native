import {FlatList, Text, View} from 'react-native';
import {useGetReminderListQuery} from '../../api/RTXquery';
import {StyleSheet} from 'react-native';
import {Checkbox, Chip, Divider, List} from 'react-native-paper';
import theme from '../../resources/style/theme';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectModToggle} from '../../modules/inputStateSlice';

export default function TaskList({filter}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, error, isLoading} = useGetReminderListQuery(filter);
  const [selectAllToggle, setSelectAllToggle] = useState(false);
  const [checkedItemIdList, setCheckedItemIdList] = useState([]);

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

  const handleCheckBox = id => {
    setCheckedItemIdList(prev => [...new Set(prev).add(id)]);
    console.log(checkedItemIdList);
  };

  const handleLongPress = id => {
    setSelectAllToggle(true);
    setCheckedItemIdList(prev => [...new Set(prev).add(id)]);
  };

  const handleCheckModCancel = () => {
    setSelectAllToggle(false);
    setCheckedItemIdList([]);
  };

  const handleDelete = () => {
    console.log(checkedItemIdList);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text>전체 리마인더</Text>
        {selectAllToggle ? (
          <View style={styles.chipContainer}>
            <Chip mode="flat" icon="cancel" onPress={handleCheckModCancel}>
              취소
            </Chip>
            <Chip mode="flat" icon="delete" onPress={handleDelete}>
              체크된 항목 삭제
            </Chip>
          </View>
        ) : null}
      </View>
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <List.Item
            style={selectAllToggle && styles.checkedItem}
            title={item?.title}
            description={item?.subTitle}
            onPress={() =>
              selectAllToggle
                ? handleCheckBox(item._id)
                : navigation.navigate({name: 'Add', params: {reminder: item}})
            }
            onLongPress={() => handleLongPress(item._id)}
            left={() => (
              <List.Icon
                style={styles.listLeft}
                color={theme.colors.primary}
                icon={
                  checkedItemIdList.includes(item._id)
                    ? 'check-bold'
                    : 'reminder'
                }
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
    flex: 0.9,
  },
  checkedItem: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    flex: 0.1,
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  listLeft: {
    backgroundColor: theme.colors.primaryContainer,
    padding: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
});
