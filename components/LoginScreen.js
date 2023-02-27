import React, { useState, useEffect } from 'react'
import { StatusBar, StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import OrangeStrokeSvg from '../assets/OrangeStroke'
import { colors, spacing, font } from '../styles/globalStyle';
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tokenLogic from '../utils/tokenLogic'
import { useDispatch, useSelector } from 'react-redux'
import { login, addNotificationToken } from '../features/login/loginSlice'
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import jwtDecode from 'jwt-decode'
import { getAllInternships } from '../features/internships/internshipsSlice'
import { getAllPartnerCompanies } from '../features/companies/companiesSlice'
import { getCategories } from '../features/filters/filtersSlice'
import { getLocations } from '../features/filters/filtersSlice'
import { getEvents } from '../features/events/eventsSlice'
import * as Notifications from 'expo-notifications';

function LoginScreen({ navigation, route }) {
  const customWidth = Dimensions.get('window').width - (spacing.xl * 2)
  const dispatch = useDispatch()
  const isFocused = useIsFocused();

  const { isLoading, response } = useSelector(state => state.login)
  const { data } = useSelector(state => state.profile)
  console.log(data)
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  })
  const getNotificationTokenData = async () => {
    const authTokenExpiration = jwtDecode(response.token).exp * 1000
    const expo_token = (await Notifications.getExpoPushTokenAsync()).data
    const data = {
      expiry_date: new Date(authTokenExpiration).toISOString(),
      expo_token: expo_token
    }
    return data
  }
  useEffect(() => {
    if (data.mobile_notifications === "on") {
      dispatch(addNotificationToken(getNotificationTokenData()))
    }
  }, [data])
  useEffect(() => {
    if (response.token) {
      saveToken(response.token)
      checkForToken()
      dispatch(getAllInternships())
      dispatch(getAllPartnerCompanies())
      dispatch(getCategories())
      dispatch(getLocations())
      dispatch(getEvents())
    } else if (response.email || response.password || response.non_field_errors) {
      Toast.show({
        type: 'error',
        text1: 'Incorrect information provided',
      });
    }
  }, [response])

  // https://github.com/react-navigation/react-navigation/issues/10394 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const onFormChange = (value, inputType) => {
    setFormData(prevState => ({
      ...prevState,
      [inputType]: value
    }))
  }
  const saveToken = async (value) => {
    await SecureStore.setItemAsync('authToken', value)
  }
  const checkForToken = async () => {
    const token = await tokenLogic.getToken().catch(err => console.log(err))
    if (token) {
      navigation.navigate('Layout', { screen: 'Companies' })
    }
  }
  const handleAuth = async () => {
    dispatch(login(formData))

  }
  // //setting > disable notifications, instead of the company name internship add a select w companies
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ minHeight: '100%' }} bounces={false}>
      <View style={styles.loginView}>
        <SvgLogo style={styles.logo} customSize={{ width: customWidth, height: customWidth / 3 }} />
        <View style={styles.content}>
          <Text style={styles.sloganText}>The <Text style={{ color: colors.main.cappuccino }}>first,</Text></Text>
          <Text style={[styles.sloganText, { color: colors.main.cappuccino }]}>popular,</Text>
          <Text style={[styles.sloganText, { color: colors.main.cappuccino }]}>leading</Text>
          <OrangeStrokeSvg />
        </View>
        <View style={[styles.content, { marginTop: 10 }]}>
          <Text style={[styles.sloganText, { color: colors.main.turquoise }]}>internship</Text>
          <Text style={[styles.sloganText, { color: colors.main.turquoise }]}>program in</Text>
          <Text style={[styles.sloganText, { color: colors.main.turquoise }]}>the country</Text>
        </View>
        <View style={[styles.content, { marginTop: 10 }]}>
          <View style={[styles.inputWrapper, { marginBottom: 10 }]}>
            <TextInput
              style={styles.input} placeholder='E-mail'
              placeholderTextColor={colors.secondary.lightGrey}
              onChangeText={(value) => onFormChange(value, 'email')}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input} placeholder='Password'
              placeholderTextColor={colors.secondary.lightGrey}
              onChangeText={(value) => onFormChange(value, 'password')}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={[styles.content, { marginTop: 20 }]}>
          <TouchableOpacity style={styles.loginButton} onPress={handleAuth}>
            {isLoading ?
              <View style={{ alignContent: 'center' }}>
                <Text style={[styles.buttonText, { color: 'transparent', textAlign: 'center' }]}  >
                  .
                  <ActivityIndicator size="small" color={colors.secondary.nearBlack} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
                </Text>
              </View>
              :
              <Text style={[styles.buttonText, { color: colors.secondary.nearBlack }]}>Log in</Text>

            }
          </TouchableOpacity>
        </View>
        <Toast />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xl
  },
  logo: {
    marginTop: 40,
    marginBottom: 60
  },
  content: {
    width: '100%'
  },
  sloganText: {
    color: colors.main.white,
    fontSize: font.size.xxl,
    fontWeight: font.fontWeight.xbold,
    letterSpacing: 1.5,
    lineHeight: 45
  },
  loginButton: {
    width: '100%',
    backgroundColor: colors.main.cappuccino,
    borderRadius: 5,
    marginVertical: 10
  },
  buttonText: {
    fontSize: font.size.xl,
    fontWeight: font.fontWeight.xbold,
    paddingVertical: 5,
    textAlign: 'center'
  },
  inputWrapper: {
    backgroundColor: colors.secondary.mediumGrey,
    padding: 5,
    borderRadius: 10,
  },

  input: {
    color: colors.main.white,
    fontSize: font.size.l,
    padding: 10,
  },
  inputStyle: {
    color: colors.secondary.lightGrey
  }
})

export default LoginScreen
