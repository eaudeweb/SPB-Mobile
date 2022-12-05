import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons'
import CompaniesScreen from './CompaniesScreen';
import InternshipsScreen from './InternshipScreen/IntershipsScreen';
import EventsScreen from './EventsScreen/EventsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import NewsScreen from './NewsScreen/NewsScreen'
import SvgLogo from '../assets/SvgLogo';
import Constants from 'expo-constants';

export default function LayoutScreen() {
  const Tab = createBottomTabNavigator()
  const screen = {
    companies: 'COMPANIES',
    internships: 'INTERNSHIPS',
    news: 'NEWS',
    events: 'EVENTS',
    profile: 'PROFILE'
  }

  return (
    <Tab.Navigator
      initialRouteName={screen.companies}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case screen.companies:
              iconName = focused ? 'md-business' : 'md-business-outline'
              break;
            case screen.internships:
              iconName = focused ? 'briefcase' : 'briefcase-outline'
              break;
            case screen.news:
              iconName = focused ? 'newspaper' : 'newspaper-outline'
              break;
            case screen.events:
              iconName = focused ? 'desktop' : 'desktop-outline'
              break;
            case screen.profile:
              iconName = focused ? 'ios-person' : 'ios-person-outline'
              break;

          }
          return <Ionicon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#F26649',
        tabBarStyle: { backgroundColor: '#121212' },
        header: () => <SvgLogo style={{ alignSelf: 'center', marginTop: Constants.statusBarHeight }} />,
        headerStyle: { marginTop: 50 }
      })}

    >
      <Tab.Screen name={screen.companies}  >
        {(props) => <CompaniesScreen {...props} text='Dada' />}
      </Tab.Screen>
      <Tab.Screen name={screen.internships} component={InternshipsScreen} />
      <Tab.Screen name={screen.news} component={NewsScreen} />
      <Tab.Screen name={screen.events} component={EventsScreen} />
      <Tab.Screen name={screen.profile} component={ProfileScreen} />
    </Tab.Navigator>
  )
}
