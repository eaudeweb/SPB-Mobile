import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationList from './ApplicationList';
import ApplicationDetail from './ApplicationDetail';
import { StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../styles/globalStyle';


// TODO consistent name
export default function ApplicationsScreen(props) {
  const Stack = createStackNavigator();
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets)
  const { navigation, route, profileNavigation, profileRoute } = props
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "ApplicationDetail") {
      profileNavigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      profileNavigation.setOptions({ tabBarStyle: styles.tabBar });
    }
  }, [profileNavigation, profileRoute])
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
