import {Avatar} from 'react-native-paper';
import theme from '../../resources/style/theme';
import {Pressable} from 'react-native';

export default function DaySelectCheckboxItem({label, status, handlePress}) {
  return (
    <Pressable onPress={() => handlePress()}>
      <Avatar.Text
        size={30}
        label={label}
        style={{
          backgroundColor: status
            ? theme.colors.primary
            : theme.colors.secondaryContainer,
          marginVertical: 8,
        }}
        labelStyle={{
          color: status ? theme.colors.onPrimary : theme.colors.secondary,
        }}
      />
    </Pressable>
  );
}
