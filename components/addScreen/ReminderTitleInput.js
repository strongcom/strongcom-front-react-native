import {useDispatch, useSelector} from 'react-redux';
import {contentInput, titleInput} from '../../modules/reminderSlice';
import {Box} from '@react-native-material/core';
import {StyleSheet, TextInput} from 'react-native';

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
          value={reminder.title}
          maxLength={30}
          onChangeText={text => handleTitleArea(text)}
        />
        <TextInput
          style={styles.title}
          placeholder="내용"
          maxLength={100}
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
    backgroundColor: '#F4F1E4',
  },
  title: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'none',
  },
});
