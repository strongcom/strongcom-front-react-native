import ReminderTitleInput from '../components/addScreen/ReminderTitleInput';
import ReminderDateInput from '../components/addScreen/ReminderDateInput';
import ReminderTimeInput from '../components/addScreen/ReminderTimeInput';
import {Button} from '@react-native-material/core';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {postReminderAsync} from '../modules/reminderSlice';
import {initAddPageToggleState} from '../modules/inputStateSlice';

export default function AddScreen({navigation}) {
  const reminder = useSelector(state => state.reminder);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(postReminderAsync(reminder));
    dispatch(initAddPageToggleState());
    navigation.navigate('List');
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          <ReminderTitleInput />
          <ReminderDateInput />
          <ReminderTimeInput />
        </View>
        <Button title="저장" onPress={handleSubmit} color={'#D8D6B4'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
