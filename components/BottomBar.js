import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SettingScreen from '../screens/SettingScreen';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {SafeAreaView} from 'react-native';

export default function BottomBar() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name="bluetooth" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            title: '리스트',
            tabBarLabel: 'List',
            tabBarIcon: ({color}) => (
              <Icon name="wifi" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: '설정',
            tabBarLabel: 'Setting',
            tabBarIcon: ({color}) => (
              <Icon name="show-chart" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
