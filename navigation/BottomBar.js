import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SettingScreen from '../screens/SettingScreen';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

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
              <Icon name="home" color={color} size={24} />
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
              <Icon name="list" color={color} size={24} />
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
              <Icon name="settings" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
