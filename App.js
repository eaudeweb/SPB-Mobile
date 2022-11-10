import { StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import CompaniesScreen from './components/CompaniesScreen';
import InternshipsScreen from './components/IntershipsScreen';
import WebinarsScreen from './components/WebinarsScreen';
import ProfileScreen from './components/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';


export default function App() {
  const Tab = createBottomTabNavigator()

  const screen = {
    companies: 'COMPANIES',
    internships: 'INTERSHIPS',
    webinars: 'WEBINARS',
    profile: 'PROFILE'
  }

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#212121',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
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
          headerShown: false,
          tabBarStyle: { backgroundColor: '#121212' }
        })}

      >
        <Tab.Screen name={screen.companies} component={CompaniesScreen} />
        <Tab.Screen name={screen.internships} component={InternshipsScreen} />
        <Tab.Screen name={screen.webinars} component={WebinarsScreen} />
        <Tab.Screen name={screen.profile} component={ProfileScreen} />


      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === "ios") ? 50 : StatusBar.currentHeight,
  }
});
