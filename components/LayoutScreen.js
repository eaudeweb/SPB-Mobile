import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons'
import CompaniesScreen from './CompaniesScreen';
import InternshipsScreen from './IntershipsScreen';
import WebinarsScreen from './WebinarsScreen';
import ProfileScreen from './ProfileScreen';
import SvgLogo from '../assets/SvgLogo';
import Svg from 'react-native-svg';
export default function LayoutScreen() {
  const Tab = createBottomTabNavigator()
  const screen = {
    companies: 'COMPANIES',
    internships: 'INTERSHIPS',
    webinars: 'WEBINARS',
    profile: 'PROFILE'
  }
  return (
    <Tab.Navigator
      initialRouteName={screen.companies}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name
          if (rn === screen.companies) {
            iconName = focused ? 'md-business' : 'md-business-outline'
          } else if (rn === screen.internships) {
            iconName = focused ? 'briefcase' : 'briefcase-outline'
          } else if (rn === screen.webinars) {
            iconName = focused ? 'desktop' : 'desktop-outline'
          } else if (rn === screen.profile) {
            iconName = focused ? 'ios-person' : 'ios-person-outline'
          }

          return <Ionicon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#F26649',
        // headerShown: false,
        tabBarStyle: { backgroundColor: '#121212' },
        header: () => <SvgLogo style={{ alignSelf: 'center', marginTop: (Platform.OS === "ios") ? 50 : StatusBar.currentHeight, }} />,
        headerStyle: { marginTop: 50 }
      })}

    >
      {/* <Tab.Screen name={screen.companies} component={CompaniesScreen} /> */}
      <Tab.Screen name={screen.companies}  >
        {(props) => <CompaniesScreen {...props} text='Dada' />}
      </Tab.Screen>
      <Tab.Screen name={screen.internships} component={InternshipsScreen} options={{ headerTitle: (props) => <SvgLogo /> }} />
      <Tab.Screen name={screen.webinars} component={WebinarsScreen} />
      <Tab.Screen name={screen.profile} component={ProfileScreen} />
    </Tab.Navigator>
  )
}
