import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme } from '@react-navigation/native';
import LayoutScreen from './components/LayoutScreen';
import LoginScreen from './components/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import LoadingScreen from './components/LoadingScreen';
import { YellowBox } from 'react-native'
export default function App() {
  YellowBox.ignoreWarnings([""]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const Stack = createStackNavigator();
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#131111',
    },
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  })
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log('Must use physical device for Push Notifications');
    }
    return token;
  }

  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test",
        body: 'All good ✌️',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
  return (
    <Provider store={store}>
      <NavigationContainer theme={CustomDarkTheme}>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}>
          <Stack.Screen name="Layout" >
            {(props) => <LayoutScreen {...props} notification={notification} setNotification={setNotification} />}
          </Stack.Screen>
          <Stack.Screen name="Loading"   >
            {(props) => <LoadingScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login" >
            {(props) => <LoginScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  )
}
