import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import BottomBar from '../components/BottomBar';
import AddScreen from './AddScreen';
import RepetitionScreen from './RepetitionScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {useSelector} from 'react-redux';
import theme from '../resources/style/theme';

export default function ManageNavigation({}) {
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
          initialRouteName={'Main'}
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.elevation.level3,
            },
          }}>
          <Stack.Screen
            name="Main"
            component={BottomBar}
            options={({route}) => ({
              title: getHeaderTitle(route),
              headerBackVisible: false,
            })}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.elevation.level3,
              },
            }}
          />
          <Stack.Screen name="Repetition" component={RepetitionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
