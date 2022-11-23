import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import InternshipMain from './InternshipMain';
import InternshipDetail from './InternshipDetail';

export default function InternshipsScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="InternshipMain" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="InternshipMain"   >
        {(props) => <InternshipMain {...props} />}
      </Stack.Screen>
      <Stack.Screen name="InternshipDetail" >
        {(props) => <InternshipDetail {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
