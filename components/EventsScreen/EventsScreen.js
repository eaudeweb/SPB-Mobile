import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EventsListScreen from './EventsListScreen';
import EventDetail from './EventDetail';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import { colors } from '../../styles/globalStyle'

export default function EventsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets)
  const Stack = createStackNavigator();
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "EventDetail") {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: styles.tabBar });
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName="EventsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsList"   >
        {(props) => <EventsListScreen props={props} />}
      </Stack.Screen>
      <Stack.Screen name="EventDetail" >
        {(props) => <EventDetail props={props} />}
      </Stack.Screen>
    </Stack.Navigator >
  )
}

const getStyles = (insets) => StyleSheet.create({
  tabBar: {
    backgroundColor: colors.secondary.mediumGrey,
    marginHorizontal: 10,
    borderRadius: 50,
    height: 60,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? insets.bottom : 10
  }
})