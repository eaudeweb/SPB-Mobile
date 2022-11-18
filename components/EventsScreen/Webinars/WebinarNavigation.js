import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EventsListScreen from './WebinarListScreen';
import EventDetail from './WebinarDetail';

export default function WebinarNavigation({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="WebinarsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WebinarsList"   >
        {(props) => <EventsListScreen navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="WebinarDetail" >
        {(props) => <EventDetail navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator >
  )
}
