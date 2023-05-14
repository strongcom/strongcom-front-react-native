import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {timeToggleInput} from '../../modules/inputStateSlice';
import {StyleSheet, View} from 'react-native';
import {TimePickerModal} from 'react-native-paper-dates';
import {Surface, Button, Text, Switch} from 'react-native-paper';
import {endTimeInput, startTimeInput} from '../../modules/reminderSlice';
import dayjs from 'dayjs';

export default function ReminderTimeInput() {
  const reminder = useSelector(state => state.reminder);
  const timeToggle = useSelector(state => state.inputState.timeToggle);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDateToggle = () => {
    dispatch(timeToggleInput(!timeToggle));
  };

  const onStartTimeDismiss = () => {
    setStartTimeOpen(false);
  };

  const onEndTimeDismiss = () => {
    setEndTimeOpen(false);
  };

  const onStartTimeConfirm = useCallback(
    ({hours, minutes}) => {
      setStartTimeOpen(false);
      dispatch(
        startTimeInput(
          dayjs().set('hour', hours).set('minute', minutes).format('HH:mm:ss'),
        ),
      );
    },
    [setStartTimeOpen],
  );

  const onEndTimeConfirm = useCallback(
    ({hours, minutes}) => {
      setEndTimeOpen(false);
      dispatch(
        endTimeInput(
          dayjs().set('hour', hours).set('minute', minutes).format('HH:mm:ss'),
        ),
      );
    },
    [setEndTimeOpen],
  );

  return (
    <Surface style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text variant="titleMedium">시간</Text>
        <Switch value={timeToggle} onValueChange={handleDateToggle} />
      </View>
      {timeToggle && (
        <View style={styles.timeButtonContainer}>
          <Button
            icon="clock-time-four-outline"
            mode="text"
            onPress={() => setStartTimeOpen(true)}>
            {reminder.startTime}
          </Button>
          <Button mode="text">~</Button>
          <Button
            icon="clock-time-eight-outline"
            mode="text"
            onPress={() => setStartTimeOpen(true)}>
            {reminder.endTime}
          </Button>
        </View>
      )}
      <TimePickerModal
        locale="ko"
        mode="range"
        visible={startTimeOpen}
        onDismiss={onStartTimeDismiss}
        onConfirm={onStartTimeConfirm}
        hours={reminder.startTime.slice(0, 2)}
        minutes={reminder.startTime.slice(3, 5)}
      />
      <TimePickerModal
        locale="ko"
        mode="range"
        visible={endTimeOpen}
        onDismiss={onEndTimeDismiss}
        onConfirm={onEndTimeConfirm}
        hours={reminder.endDate.slice(0, 2)}
        minutes={reminder.endDate.slice(3, 5)}
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
    alignItems: 'center',
  },
  timeButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 4,
  },
});
