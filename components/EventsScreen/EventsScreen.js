import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventsNavigation from './Events/EventsNavigation';
import WebinarNavigation from './Webinars/WebinarNavigation';

export default function EventsScreen() {
  const Tab = createMaterialTopTabNavigator();

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
          backgroundColor: '#F26649'
        },
        tabBarStyle: {
          backgroundColor: '#212121',
          borderWidth: 0
        }
      }}
    >
      <Tab.Screen name="Events">
        {(props) => <EventsNavigation {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Webinars">
        {(props) => <WebinarNavigation {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
