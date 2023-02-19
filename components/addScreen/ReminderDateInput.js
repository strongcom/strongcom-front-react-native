import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dateToggleInput} from '../../modules/inputStateSlice';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '@react-native-material/core';
import {Switch} from 'native-base';
import {DatePickerModal} from 'react-native-paper-dates';
import {endDateInput, startDateInput} from '../../modules/reminderSlice';
import dayjs from 'dayjs';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    <>
      <View style={styles.container}>
        <View style={styles.dateButtonContainer}>
          <Text variant="h6">날짜</Text>
          <Switch value={dateToggle} onValueChange={handleDateToggle} />
        </View>
        {dateToggle && (
          <View>
            <View style={styles.dateButtonContainer}>
              <Button
                variant={'outlined'}
                title={reminder.startDate}
                onPress={() => setOpen(true)}
              />
              <Text> ~ </Text>
              <Button
                variant={'outlined'}
                title={reminder.endDate}
                onPress={() => setOpen(true)}
              />
            </View>
            <DatePickerModal
              locale="ko"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={new Date(reminder.startDate)}
              endDate={new Date(reminder.endDate)}
              onConfirm={onConfirm}
            />
          </View>
        )}
        <Divider />
        <View style={styles.buttonContainer}>
          <Button
            title="반복 안함"
            leading={() => <Icon name="repeat" size={24} />}
            variant="outlined"
            color="black"
            onPress={handleRepetitionClick}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F1E4',
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
  buttonContainer: {
    marginHorizontal: 8,
    marginTop: 8,
  },
});
