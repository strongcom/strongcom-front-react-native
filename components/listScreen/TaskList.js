import {FlatList, RefreshControl, StyleSheet, View, Image} from 'react-native';
import {Chip, Divider, List, Text, Surface} from 'react-native-paper';
import theme from '../../resources/style/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useDeleteReminderMutation} from '../../api/SpringServer';
import Loading from '../Loading';

export default function TaskList({
  title = '전체 리마인더',
  data,
  error,
  isLoading,
  refreshing,
  onRefresh,
}) {
  const navigation = useNavigation();
  const [selectAllToggle, setSelectAllToggle] = useState(false);
  const [checkedItemIdList, setCheckedItemIdList] = useState([]);
  const [deleteReminder] = useDeleteReminderMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  const handleCheckBox = id => {
    if (checkedItemIdList.includes(id)) {
      setCheckedItemIdList(checkedItemIdList.filter(v => v !== id));
    } else {
      setCheckedItemIdList(prev => [...new Set(prev).add(id)]);
    }
  };

  const handleLongPress = id => {
    setSelectAllToggle(true);
    setCheckedItemIdList(prev => [...new Set(prev).add(id)]);
  };

  const handleCheckModCancel = () => {
    setSelectAllToggle(false);
    setCheckedItemIdList([]);
  };

  const handleDelete = async () => {
    for (const id of checkedItemIdList) {
      await deleteReminder(id);
    }
    setSelectAllToggle(false);
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <List.Item
            style={
              checkedItemIdList.includes(item?.reminderId) && styles.checkedItem
            }
            title={item?.title}
            description={item?.subTitle}
            onPress={() =>
              selectAllToggle
                ? handleCheckBox(item.reminderId)
                : navigation.navigate({
                    name: 'Add',
                    params: {id: item.reminderId},
                  })
            }
            onLongPress={() => handleLongPress(item.reminderId)}
            left={() => (
              <List.Icon
                style={styles.listLeft}
                color={theme.colors.primary}
                icon={
                  checkedItemIdList.includes(item.reminderId)
                    ? 'check-bold'
                    : 'reminder'
                }
              />
            )}
          />
        )}
        keyExtractor={item => item.reminderId}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    width: 50,
    height: 50,
  },
  title: {
    color: theme.colors.scrim,
  },
});
