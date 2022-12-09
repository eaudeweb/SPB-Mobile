import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme } from '@react-navigation/native';
import LayoutScreen from './components/LayoutScreen';
import LoginScreen from './components/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const Stack = createStackNavigator();
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#131111',

    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={CustomDarkTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Layout" >
            {(props) => <LayoutScreen {...props} isUserLogged={isUserLogged} />}
          </Stack.Screen>
          <Stack.Screen name="Login" >
            {(props) => <LoginScreen {...props} isUserLogged={isUserLogged} setIsUserLogged={setIsUserLogged} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  )
}
