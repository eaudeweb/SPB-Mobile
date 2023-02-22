import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApplicationsMain from './ApplicationsScreen/ApplicationsScreen';
import CVMain from './CVScreen/CVMain';
import SettingsMain from './SettingsScreen/SettingsMain';
import CustomTabBar from '../../utils/CustomTabBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../features/profile/profileSlice';
import * as Notifications from 'expo-notifications';
import { loginActions } from '../../features/login/loginSlice';

export default function ProfileScreen({ navigation, route, rootNavigation }) {
  const Tab = createMaterialTopTabNavigator();
  // TODO move to separate file and import 
  const dispatch = useDispatch()
  const { tokens } = useSelector(state => state.profile.data)
  const { notificationToken } = useSelector(state => state.login)
  useEffect(() => {
    dispatch(getProfileData())
  }, [])
  const getDeviceToken = async () => (await Notifications.getExpoPushTokenAsync()).data
  const updateExpoNotificationToken = async () => {
    const deviceToken = await getDeviceToken()
    const deviceTokens = tokens.filter(token => token.expo_token === deviceToken)
    dispatch(loginActions.updateNotificationToken(deviceTokens[deviceTokens.length - 1]))
  }
  useEffect(() => {
    if (tokens?.length && !notificationToken) {
      updateExpoNotificationToken()
    }
  }, [tokens])
  // const notificationTokenObj = internshipsData.tokens
  // console.log(notificationTokenObj)
  const screens = [
    {
      name: 'Applications',
      screen: 'Applications',
    },
    {
      name: 'CV',
      screen: 'CV',
    },
    {
      name: 'Settings',
      screen: 'Settings',
    },
  ]
  return (
    <Tab.Navigator
      initialRouteName='Applications'
      screenOptions={{
        tabBarContentContainerStyle: {
          backgroundColor: 'none'
        },
        tabBarActiveTintColor: '#F26649',
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: {
          backgroundColor: '#F26649'
        },
        tabBarStyle: {
          backgroundColor: '#212121',
          borderWidth: 0,
        },
      }}
      tabBar={(props) => < CustomTabBar {...props} screens={screens} />}
    >
      <Tab.Screen name="Applications">
        {(props) => <ApplicationsMain {...props} profileNavigation={navigation} profileRoute={route} />}
      </Tab.Screen>
      <Tab.Screen name="CV">
        {(props) => <CVMain {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {(props) => <SettingsMain {...props} rootNavigation={rootNavigation} />}
      </Tab.Screen>
    </Tab.Navigator >
  )
}
