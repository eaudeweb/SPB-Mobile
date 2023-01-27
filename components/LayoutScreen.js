import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, View, Text } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import CompaniesScreen from './CompaniesScreen';
import InternshipsScreen from './InternshipScreen/IntershipsScreen';
import EventsScreen from './EventsScreen/EventsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import NewsScreen from './NewsScreen/NewsScreen'
import { colors } from '../styles/globalStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

export default function LayoutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const Tab = createBottomTabNavigator()
  const screen = {
    companies: 'Companies',
    internships: 'Internships',
    news: 'News',
    events: 'Calendar',
    profile: 'Profile'
  }
  const getToken = async () => {
    const result = await SecureStore.getItemAsync('authToken')
    return result
  }

  useEffect(() => {
    //prevent swiping back to the login screen after login occurred succesfully 
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
  }, [])

  return (
    <Tab.Navigator
      initialRouteName={screen.companies}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //TODO: simplify
          switch (route.name) {
            case screen.companies:
              iconName = 'globe'
              break;
            case screen.internships:
              iconName = 'clipboard-list'
              break;
            case screen.news:
              iconName = 'newspaper'
              break;
            case screen.events:
              iconName = 'calendar-alt'
              break;
            case screen.profile:
              iconName = 'user-circle'
              break;
          }
          return <FaIcon name={iconName} size={size} color={focused ? colors.main.accent : colors.secondary.lightGrey} />
        },
        style: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: colors.secondary.cream,
        tabBarStyle: [styles.tabBar, { bottom: Platform.OS === 'ios' ? insets.bottom : 10 }],
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false
      })}

    >
      <Tab.Screen name={screen.companies}>
        {(props) => <CompaniesScreen {...props} text='Props passing test' />}
      </Tab.Screen>
      <Tab.Screen name={screen.internships} component={InternshipsScreen} />
      <Tab.Screen name={screen.news} component={NewsScreen} />
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
    height: 60,
    position: 'absolute',
  },
  tabBarItem: {
    height: Platform.OS === 'ios' ? '200%' : '100%',
  },
  tabBarLabel: {
    marginBottom: 5,
  }
})
