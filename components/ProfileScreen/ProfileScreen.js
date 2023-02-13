import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApplicationsMain from './ApplicationsScreen/ApplicationsScreen';
import CVMain from './CVScreen/CVMain';
import SettingsMain from './SettingsScreen/SettingsMain';
import CustomTabBar from '../../utils/CustomTabBar';

export default function ProfileScreen({ navigation, route }) {
  const Tab = createMaterialTopTabNavigator();
  // TODO move to separate file and import 
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

      }}
      tabBar={(props) => < CustomTabBar {...props} screens={screens} />}
    >
      <Tab.Screen name="Applications">
        {(props) => <ApplicationsMain {...props} profileNavigation={navigation} profileRoute={route} />}
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
