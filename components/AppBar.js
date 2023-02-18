import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import BottomBar from './BottomBar';
import AddScreen from '../screens/AddScreen';
import RepetitionScreen from '../screens/RepetitionScreen';
import LoginScreen from '../screens/LoginScreen';

export default function AppBar({}) {
  const Stack = createNativeStackNavigator();

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const nameMap = {
      Home: '홈',
      List: '리스트',
      Setting: '설정',
    };

    return nameMap[routeName];
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'white',
            },
          }}>
          <Stack.Screen
            name="Main"
            component={BottomBar}
            options={({route}) => ({
              title: getHeaderTitle(route),
            })}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Repetition" component={RepetitionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
