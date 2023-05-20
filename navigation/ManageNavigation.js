import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {useEffect} from 'react';
import {getAsyncData} from '../lib/AsyncManager';
import {Text} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import theme from '../resources/style/theme';
import TabNavigator from './TabNavigator';
import AddScreen from '../screens/AddScreen';
import RepetitionScreen from '../screens/RepetitionScreen';
import ImageAddScreen from '../screens/ImageAddScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useDispatch, useSelector} from 'react-redux';

export default function ManageNavigation({}) {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();
  const data = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    dispatch(getAsyncData('access_token'));
  }, [data]);

  // useEffect(() => {
  //   console.log('data', data);
  //   console.log('loading', loading);
  //   console.log('error', error);
  // }, [data, loading, error]);

  const getHeaderTitleInTabNav = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const nameMap = {
      Home: '홈',
      List: '리스트',
      Setting: '설정',
    };
    return nameMap[routeName];
  };

  if (loading) {
    return <Text>{'로딩중'}</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.elevation.level3,
          },
        }}>
        {data ? (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={({route}) => ({
                title: getHeaderTitleInTabNav(route),
              })}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{title: '리마인더 추가'}}
            />
            <Stack.Screen
              name="Repetition"
              component={RepetitionScreen}
              options={{title: '반복 설정'}}
            />
            <Stack.Screen
              name="ImageAdd"
              component={ImageAddScreen}
              options={{title: '이미지 추가등록'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: '로그인'}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{title: '추가 정보 등록'}}
            />
            {/*<Stack.Screen*/}
            {/*  name="Register"*/}
            {/*  component={RegisterScreen}*/}
            {/*  options={{title: '회원가입'}}*/}
            {/*/>*/}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
