import {useDispatch, useSelector} from 'react-redux';
import {
  RepetitionDayInput,
  RepetitionPeriodInput,
} from '../modules/reminderSlice';
import {Divider, RadioButton} from 'react-native-paper';
import {repetitionList} from '../resources/string';
import {View, StyleSheet} from 'react-native';
import DaySelectCheckboxItem from '../components/addScreen/DaySelectCheckboxItem';
import {useState} from 'react';
import theme from '../resources/style/theme';

export default function RepetitionScreen() {
  const reminder = useSelector(state => state.reminder);
  const dispatch = useDispatch();

  const handlePeriodClick = period => {
    dispatch(RepetitionPeriodInput(period));
  };

  const handleDayClick = day => {
    dispatch(RepetitionDayInput(day));
  };

  return (
    <View style={styles.container}>
      <RadioButton.Group
        onValueChange={newValue => handlePeriodClick(newValue)}
        value={reminder.repetitionPeriod}>
        {repetitionList.map(item => (
          <View key={item.key}>
            <View style={styles.radioGroupContainer}>
              <RadioButton.Item
                value={item.value}
                label={item.text}
                status={
                  item.value === reminder.repetitionPeriod
                    ? 'checked'
                    : 'unchecked'
                }
              />
              <View style={styles.checkBoxContainer}>
                {item.dayList && reminder.repetitionPeriod === 'WEEKLY'
                  ? item.dayList.map(day => (
                      <DaySelectCheckboxItem
                        key={day.key}
                        label={day.text}
                        status={reminder.repetitionDay.includes(day.value)}
                        handlePress={() => handleDayClick(day.value)}
                      />
                    ))
                  : null}
              </View>
            </View>
            <Divider />
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 16,
    backgroundColor: theme.colors.elevation.level0,
  },
  radioGroupContainer: {
    display: 'flex',
    marginVertical: 8,
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
});
