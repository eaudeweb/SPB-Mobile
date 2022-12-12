import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import CompaniesScreen from './CompaniesScreen';
import InternshipsScreen from './InternshipScreen/IntershipsScreen';
import EventsScreen from './EventsScreen/EventsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import SvgLogo from '../assets/SvgLogo';
import Constants from 'expo-constants';
import { colors, font } from '../styles/globalStyle';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

console.log(Constants.statusBarHeight)
export default function LayoutScreen() {
  const insets = useSafeAreaInsets();
  console.log(insets)
  const Tab = createBottomTabNavigator()
  const screen = {
    companies: 'Companies',
    internships: 'Internships',
    news: 'News',
    events: 'Calendar',
    profile: 'Profile'
  }

  return (
    <Tab.Navigator
      initialRouteName={screen.companies}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case screen.companies:
              iconName = 'globe'
              break;
            case screen.internships:
              iconName = 'clipboard-list'
              break;
            case screen.news:
              iconName = focused ? 'newspaper' : 'newspaper-outline'
              break;
            case screen.events:
              iconName = 'calendar-alt'
              break;
            case screen.profile:
              iconName = 'user-circle'
              break;
          }
          return <FaIcon name={iconName} size={size} color={focused ? colors.main.accent : colors.secondary.lightGrey} padding={10} />
        },
        style: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: colors.secondary.cream,
        tabBarStyle: [styles.tabBar, { bottom: Platform.OS === 'ios' ? insets.bottom : 10 }],
        headerStyle: { backgroundColor: 'blue' },
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        header: () => <SvgLogo style={{ alignSelf: 'center', marginTop: insets.top }} />,
      })}

    >
      <Tab.Screen name={screen.companies}>
        {(props) => <CompaniesScreen {...props} text='Props passing test' />}
      </Tab.Screen>
      <Tab.Screen name={screen.internships} component={InternshipsScreen} />
      {/* <Tab.Screen name={screen.news} component={NewsScreen} /> */}
      <Tab.Screen name={screen.events} component={EventsScreen} />
      <Tab.Screen name={screen.profile} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.secondary.mediumGrey,
    marginHorizontal: 10,
    borderRadius: 50,
    height: 70,
    position: 'absolute',
  },
  tabBarItem: {
    height: Platform.OS === 'ios' ? '170%' : '100%',
  },
  tabBarLabel: {
    marginBottom: 10
  }
})
