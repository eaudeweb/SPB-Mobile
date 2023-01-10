import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationList from './ApplicationList';
import ApplicationDetail from './ApplicationDetail';

// TODO consistent name
export default function ApplicationsScreen(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="ApplicationsList" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="ApplicationsList"   >
        {(props) => <ApplicationList {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ApplicationDetail" >
        {(props) => <ApplicationDetail {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
