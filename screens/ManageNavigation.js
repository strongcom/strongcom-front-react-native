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
import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useState} from 'react';
import {getCookie} from '../lib/cookieManager';
import ImageAddScreen from './ImageAddScreen';

export default function ManageNavigation({}) {
  const Stack = createNativeStackNavigator();
  // const [initialRoute, setInitialRoute] = useState();
  //
  // useEffect(() => {
  //   getCookie().then(r => setInitialRoute(r));
  // }, [initialRoute]);
  //
  // console.log(initialRoute);

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
          initialRouteName={'Login'}
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
          <Stack.Screen name="ImageAdd" component={ImageAddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
