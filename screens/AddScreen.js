import ReminderTitleInput from '../components/addScreen/ReminderTitleInput';
import ReminderDateInput from '../components/addScreen/ReminderDateInput';
import ReminderTimeInput from '../components/addScreen/ReminderTimeInput';
import {Button} from 'react-native-paper';
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
        <View style={styles.rowContainer}>
          <Button
            style={styles.button}
            mode={'contained-tonal'}
            icon={'cancel'}>
            취소
          </Button>
          <Button
            style={styles.button}
            mode={'contained-tonal'}
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
