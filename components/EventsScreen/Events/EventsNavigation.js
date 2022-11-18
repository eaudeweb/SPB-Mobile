import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EventsListScreen from './EventsListScreen';
import EventDetail from './EventDetail';

export default function EventsNavigation({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="EventsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsList"   >
        {(props) => <EventsListScreen navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="EventDetail" >
        {(props) => <EventDetail navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator >
  )
}
