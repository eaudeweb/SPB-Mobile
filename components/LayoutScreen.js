import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, View, Text, BackHandler } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import CompaniesScreen from './CompaniesScreen/CompaniesScreen';
import InternshipsScreen from './InternshipScreen/IntershipsScreen';
import EventsScreen from './EventsScreen/EventsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import NewsScreen from './NewsScreen/NewsScreen'
import { colors } from '../styles/globalStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInternships } from '../features/internships/internshipsSlice'
import { getAllPartnerCompanies } from '../features/companies/companiesSlice';
import { getCategories, getLocations } from '../features/filters/filtersSlice';
import { getEvents } from '../features/events/eventsSlice';
import tokenLogic from '../utils/tokenLogic';
import { loginActions } from '../features/login/loginSlice';
import * as Notifications from 'expo-notifications';

export default function LayoutScreen(props) {
  const insets = useSafeAreaInsets();
  const Tab = createBottomTabNavigator()
  const dispatch = useDispatch()
  const internshipsData = useSelector(state => state.internships)
  const events = useSelector(state => state.events)
  // const { isInternshipsLoading: isLoading, isRefreshLoading } = internshipsData
  // const { booking, isEventsLoading: loading } = useSelector(state => state.events)
  const isTokenValid = async () => await tokenLogic.getToken().then(response => response)

  useEffect(() => {
    //whenever an internship/event action is performed we verify the validity of the token, and if the token is valid user is logged out
    tokenLogic.getToken().then(response => {
      if (!response) {
        dispatch(loginActions.resetLogin())
        props.navigation.navigate('Login')
        tokenLogic.deleteToken()
      }

    })
  }, [internshipsData.isRefreshLoading, internshipsData.isLoading, internshipsData.application, events.isLoading, events.booking])

  const screen = {
    companies: 'Companies',
    internships: 'Internships',
    news: 'News',
    events: 'Events',
    profile: 'Profile'
  }
  useEffect(() => {
    dispatch(getAllInternships())
    dispatch(getAllPartnerCompanies())
    dispatch(getCategories())
    dispatch(getLocations())
    dispatch(getEvents())
    props.navigation.setOptions({ gestureEnabled: false });
  }, [])

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    })
  })

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
      <Tab.Screen name={screen.profile}  >
        {(props) => <ProfileScreen  {...props} rootNavigation={props.navigation} />}
      </Tab.Screen>
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
    height: Platform.OS === 'ios' ? Platform.isPad ? '100%' : '200%' : '100%',
  },
  tabBarLabel: {
    marginBottom: 5,
  }
})
