import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {timeToggleInput} from '../../modules/inputStateSlice';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '@react-native-material/core';
import {Switch} from 'native-base';
import {TimePickerModal} from 'react-native-paper-dates';
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
          dayjs().set('hour', hours).set('minute', minutes).format(),
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
          dayjs().set('hour', hours).set('minute', minutes).format(),
        ),
      );
    },
    [setEndTimeOpen],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.dateButtonContainer}>
          <Text variant="h6">시간</Text>
          <Switch value={timeToggle} onValueChange={handleDateToggle} />
        </View>
        {timeToggle && (
          <View>
            <View style={styles.dateButtonContainer}>
              <Button
                variant={'outlined'}
                title={reminder.startDate.split('T')[1].split('+')[0]}
                onPress={() => setStartTimeOpen(true)}
              />
              <Text> ~ </Text>
              <Button
                variant={'outlined'}
                title={reminder.endDate.split('T')[1].split('+')[0]}
                onPress={() => setEndTimeOpen(true)}
              />
            </View>
            <TimePickerModal
              locale="ko"
              mode="range"
              visible={startTimeOpen}
              onDismiss={onStartTimeDismiss}
              onConfirm={onStartTimeConfirm}
              hours={reminder.startDate.split('T')[1].slice(0, 2)}
              minutes={reminder.startDate.split('T')[1].slice(3, 5)}
            />
            <TimePickerModal
              locale="ko"
              mode="range"
              visible={endTimeOpen}
              onDismiss={onEndTimeDismiss}
              onConfirm={onEndTimeConfirm}
              hours={reminder.endDate.split('T')[1].slice(0, 2)}
              minutes={reminder.endDate.split('T')[1].slice(3, 5)}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7ff',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  dateButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
