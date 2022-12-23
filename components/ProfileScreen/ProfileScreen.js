import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApplicationsMain from './ApplicationsScreen/ApplicationsScreen';
import CVMain from './CVScreen/CVMain';
import SettingsMain from './SettingsScreen/SettingsMain';
import CustomTabBar from '../../utils/CustomTabBar';
export default function ProfileScreen() {
  const Tab = createMaterialTopTabNavigator();
  const screens = [
    {
      name: 'Applications',
      screen: 'Applications',
    },
    {
      name: 'CV',
      screen: 'CV',
    },
    {
      name: 'Settings',
      screen: 'Settings',
    },
  ]
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
        },
      }}
      tabBar={(props) => < CustomTabBar {...props} screens={screens} />}
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
    </Tab.Navigator >
  )
}
