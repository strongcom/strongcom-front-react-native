import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import BottomBar from './BottomBar';
import {View, Text} from 'react-native';

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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
