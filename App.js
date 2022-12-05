import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme } from '@react-navigation/native';
import LayoutScreen from './components/LayoutScreen';
import LoginScreen from './components/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const Stack = createStackNavigator();
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#212121',
      lightBackground: '#353535',
      darkBackground: '121212',
      jumbotron: '#616161',
      accentColor: '#F26649',
      primaryText: 'white',
      secondaryText: ''
    },
  };

  return (
    <NavigationContainer theme={CustomDarkTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Layout" >
          {(props) => <LayoutScreen {...props} isUserLogged={isUserLogged} />}
        </Stack.Screen>
        <Stack.Screen name="Login" >
          {(props) => <LoginScreen {...props} isUserLogged={isUserLogged} setIsUserLogged={setIsUserLogged} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
  );
}
