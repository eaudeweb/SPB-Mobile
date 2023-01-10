import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WebinarList from './WebinarListScreen';
import WebinarDetail from './WebinarDetail';

export default function WebinarNavigation({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="WebinarsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WebinarsList"   >
        {(props) => <WebinarList navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="WebinarDetail" >
        {(props) => <WebinarDetail navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator >
  )
}
