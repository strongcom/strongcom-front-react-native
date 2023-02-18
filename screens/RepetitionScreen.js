import {useDispatch, useSelector} from 'react-redux';
import {
  RepetitionDayInput,
  RepetitionPeriodInput,
} from '../modules/reminderSlice';
import {RadioButton, Text} from 'react-native-paper';
import {repetitionList} from '../resources/string';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';

export default function RepetitionScreen() {
  const reminder = useSelector(state => state.reminder);
  const [checkValue, setCheckValue] = useState(reminder.RepetitionPeriod);
  const dispatch = useDispatch();

  const handlePeriodClick = period => {
    setCheckValue(period);
    dispatch(RepetitionPeriodInput(period));
  };

  const handleDayClick = (event, day) => {
    dispatch(RepetitionDayInput(day));
  };
  return (
    <>
      <RadioButton.Group
        onValueChange={newValue => handlePeriodClick(newValue)}
        value={checkValue}>
        {repetitionList.map(item => (
          <View style={styles.container}>
            <RadioButton
              value={item.value}
              status={item.value === checkValue ? 'checked' : 'unchecked'}
            />
            <Text>{item.text}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});
