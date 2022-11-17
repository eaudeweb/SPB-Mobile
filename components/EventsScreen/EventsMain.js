import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventsListScreen from './EventsListScreen';
import WebinarsScreen from './WebinarsScreen';
import Ionicon from 'react-native-vector-icons/Ionicons'

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
        tabBarStyle: { backgroundColor: '#212121', borderWidth: 0 }
      }}
    >
      <Tab.Screen name="Events">
        {() => <EventsListScreen />}
      </Tab.Screen>
      <Tab.Screen name="Webinars">
        {() => <WebinarsScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})