import React from 'react'
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApplicationsMain from './ApplicationsScreen/ApplicationsMain';
import CVMain from './CVScreen/CVMain';
import SettingsMain from './SettingsScreen/SettingsMain';

export default function ProfileScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName='Applications'
      screenOptions={{
        tabBarContentContainerStyle: {
          backgroundColor: 'none'
        },
        tabBarActiveTintColor: '#F26649',
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: {
          backgroundColor: '#F26649'
        },
        tabBarStyle: {
          backgroundColor: '#212121',
          borderWidth: 0
        }
      }}
    >
      <Tab.Screen name="Applications">
        {(props) => <ApplicationsMain {...props} />}
      </Tab.Screen>
      <Tab.Screen name="CV">
        {(props) => <CVMain {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {(props) => <SettingsMain {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
