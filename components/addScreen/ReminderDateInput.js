import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dateToggleInput} from '../../modules/inputStateSlice';
import {StyleSheet, View} from 'react-native';
import {DatePickerModal} from 'react-native-paper-dates';
import {endDateInput, startDateInput} from '../../modules/reminderSlice';
import dayjs from 'dayjs';
import {Button, Surface, Switch, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ReminderDateInput() {
  const reminder = useSelector(state => state.reminder);
  const dateToggle = useSelector(state => state.inputState.dateToggle);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRepetitionClick = () => {
    navigation.navigate('Repetition');
  };
  const handleDateToggle = () => {
    dispatch(dateToggleInput(!dateToggle));
  };

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirm = useCallback(
    ({startDate, endDate}) => {
      setOpen(false);
      dispatch(startDateInput(dayjs(startDate).format('YYYY-MM-DD')));
      dispatch(endDateInput(dayjs(endDate).format('YYYY-MM-DD')));
    },
    [dateToggle],
  );

  return (
    <Surface style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text variant="titleMedium">날짜</Text>
        <Switch value={dateToggle} onValueChange={handleDateToggle} />
      </View>
      {dateToggle && (
        <View style={styles.dateButtonContainer}>
          <Button
            icon="calendar-month-outline"
            mode="text"
            onPress={() => setOpen(true)}>
            {reminder.startDate} ~ {reminder.endDate}
          </Button>
          <Button icon="repeat" mode="text" onPress={handleRepetitionClick}>
            반복 설정
          </Button>
        </View>
      )}
      <DatePickerModal
        locale="ko"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={new Date(reminder.startDate)}
        endDate={new Date(reminder.endDate)}
        onConfirm={onConfirm}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});
