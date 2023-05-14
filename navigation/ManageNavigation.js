import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {getCookie} from '../lib/cookieManager';
import {Text} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import theme from '../resources/style/theme';
import BottomBar from './BottomBar';
import AddScreen from '../screens/AddScreen';
import RepetitionScreen from '../screens/RepetitionScreen';
import ImageAddScreen from '../screens/ImageAddScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function ManageNavigation({}) {
  const Stack = createNativeStackNavigator();

  const [state, setState] = useState('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCookie();
        setIsLoggedIn(!!res);
      } catch (e) {
        setState('error');
      } finally {
        setState('success');
      }
    })();
  }, []);

  useEffect(() => {
    console.log('state', state);
    console.log('isLoggedIn', isLoggedIn);
  }, [state, isLoggedIn]);

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const nameMap = {
      Home: '홈',
      List: '리스트',
      Setting: '설정',
    };
    return nameMap[routeName];
  }

  if (state === 'loading') {
    return <Text>{'로딩중'}</Text>;
  } else if (state === 'error') {
    return <Text>{'쿠키 가져오기 오류'}</Text>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Main' : 'Login'}
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
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
