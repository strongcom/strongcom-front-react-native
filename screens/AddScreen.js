import ReminderTitleInput from '../components/addScreen/ReminderTitleInput';
import ReminderDateInput from '../components/addScreen/ReminderDateInput';
import ReminderTimeInput from '../components/addScreen/ReminderTimeInput';

export default function AddScreen() {
  return (
    <>
      <ReminderTitleInput />
      <ReminderDateInput />
      <ReminderTimeInput />
    </>
  );
}
