import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Platform } from 'react-native'
import InternshipMain from './InternshipMain';
import InternshipDetail from './InternshipDetail';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { colors } from '../../styles/globalStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InternshipsScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets)

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "InternshipDetail") {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: styles.tabBar });
    }
  }, [navigation, route])
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
