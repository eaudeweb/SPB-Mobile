import { useState } from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import LayoutScreen from './components/LayoutScreen';
import LoginScreen from './components/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false)

  const Stack = createStackNavigator();
  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#212121',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === "ios") ? 50 : StatusBar.currentHeight,
  }
});
