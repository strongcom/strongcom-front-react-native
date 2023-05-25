import ReminderTitleInput from '../components/addScreen/ReminderTitleInput';
import ReminderDateInput from '../components/addScreen/ReminderDateInput';
import ReminderTimeInput from '../components/addScreen/ReminderTimeInput';
import {Button, Text} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {postReminderAsync} from '../modules/reminderSlice';
import {
  dateToggleInput,
  initAddPageToggleState,
  timeToggleInput,
} from '../modules/inputStateSlice';
import {
  useGetReminderByIdQuery,
  usePostReminderMutation,
} from '../api/SpringServer';
import theme from '../resources/style/theme';
import React, {useEffect, useLayoutEffect} from 'react';
import {initReminder, setReminder} from '../modules/reminderSlice';
import Loading from '../components/Loading';

export default function AddScreen({navigation, route}) {
  const reminder = useSelector(state => state.reminder);
  const {data, error, isLoading} = useGetReminderByIdQuery(route.params?.id, {
    skip: !route.params?.id,
  });
  const [postReminder] = usePostReminderMutation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (route.params?.id) {
      navigation.setOptions({
        headerTitle: '리마인더 수정',
      });
    }
  }, [navigation, route.params?.id]);

  useEffect(() => {
    if (route.params?.id && data) {
      dispatch(setReminder(JSON.stringify(data)));
      dispatch(dateToggleInput(true));
      dispatch(timeToggleInput(true));
    }
  }, [route.params?.id, data, dispatch, reminder.startDate, reminder.endDate]);

  useEffect(() => {
    return () => {
      dispatch(initReminder());
      dispatch(initAddPageToggleState());
    };
  }, [dispatch]);

  const handleSubmit = async () => {
    console.log(reminder);
    const {data, error} = await postReminder({
      ...reminder,
      startTime: reminder.startTime.slice(0, -3),
      endTime: reminder.endTime.slice(0, -3),
      repetitionDay: reminder.repetitionDay.join(' '),
    });
    console.log(data, error);
    dispatch(initAddPageToggleState());
    navigation.navigate('List');
  };

  const handleCancel = () => {
    navigation.navigate('List');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{'에러 발생'}</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <ReminderTitleInput />
          <ReminderDateInput />
          <ReminderTimeInput />
        </View>
        <View style={styles.rowContainer}>
          <Button
            style={styles.button}
            mode={'elevated'}
            icon={'cancel'}
            onPress={handleCancel}>
            취소
          </Button>
          <Button
            style={styles.button}
            mode={'elevated'}
            icon={'content-save'}
            onPress={handleSubmit}>
            저장
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 16,
    backgroundColor: theme.colors.elevation.level0,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
  },
});
