import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventsNavigation from './Events/EventsNavigation';
import WebinarNavigation from './Webinars/WebinarNavigation';
import CustomTabBar from '../../utils/CustomTabBar';
import { StatusBar } from 'react-native';
import Constants from 'expo-constants';

export default function EventsScreen() {
  const Tab = createMaterialTopTabNavigator();
  const screens = [
    {
      name: 'Events',
      screen: 'Events',
    },
    {
      name: 'Webinars',
      screen: 'Webinars',
    }
  ]
  return (
    <Tab.Navigator
      initialRouteName='Events'
      screenOptions={{
        tabBarContentContainerStyle: {
          backgroundColor: 'none'
        },
        tabBarActiveTintColor: '#F26649',
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: {
          backgroundColor: '#F26649',
        },
        tabBarStyle: {
          backgroundColor: '#212121',
          borderWidth: 0,
          paddingTop: Constants.statusBarHeight
        }
      }}
      tabBar={(props) => <CustomTabBar {...props} screens={screens} />}
    >
      <Tab.Screen name="Events">
        {(props) => <EventsNavigation {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Webinars">
        {(props) => <WebinarNavigation {...props} />}
      </Tab.Screen>
    </ Tab.Navigator>
  )
}
