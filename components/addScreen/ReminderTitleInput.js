import {useDispatch, useSelector} from 'react-redux';
import {contentInput, titleInput} from '../../modules/reminderSlice';
import {TextInput} from '@react-native-material/core';
import {Box} from '@react-native-material/core';
import {StyleSheet} from 'react-native';

export default function ReminderTitleInput() {
  const reminder = useSelector(state => state.reminder);
  const dispatch = useDispatch();
  const handleTitleArea = text => {
    dispatch(titleInput(text));
  };
  const handleContentArea = text => {
    dispatch(contentInput(text));
  };
  return (
    <>
      <Box style={styles.container}>
        <TextInput
          style={styles.title}
          placeholder="제목"
          variant="standard"
          rows={1}
          value={reminder.title}
          onChangeText={text => handleTitleArea(text)}
        />
        <TextInput
          style={styles.title}
          placeholder="내용"
          variant="standard"
          rows={1}
          value={reminder.content}
          onChangeText={text => handleContentArea(text)}
        />
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 16,
    backgroundColor: '#fff7ff',
  },
  title: {
    margin: 4,
    backgroundColor: 'none',
  },
});
