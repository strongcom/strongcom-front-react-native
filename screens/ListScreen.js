import TaskList from '../components/listScreen/TaskList';
import {AnimatedFAB} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ListScreen({navigation}) {
  return (
    <>
      <View style={styles.container}>
        <TaskList filter={''} />
        <AnimatedFAB
          icon={() => <Icon name="add" size={24} />}
          label={'Label'}
          extended={false}
          onPress={() => navigation.navigate('Add')}
          iconMode={'static'}
          style={styles.fabStyle}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
