import React, { useState } from 'react'
import { useEffect } from 'react'
import { StatusBar, StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import OrangeStrokeSvg from '../assets/OrangeStroke'
import { colors, spacing, font } from '../styles/globalStyle';
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function LoginScreen({ navigation }) {
  const customWidth = Dimensions.get('window').width - (spacing.xl * 2)
  useEffect(() => {
    checkForToken()
  }, [])
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
    const result = await SecureStore.setItemAsync('authToken', value)
    return result
  }
  const checkForToken = async () => {
    SecureStore.getItemAsync('authToken').then(token => {
      if (token) {
        navigation.navigate('Layout')
      }
    })
  }
  const handleAuth = async () => {
    try {
      const response = await fetch(
        "https://staging.stagiipebune.ro/api/v1/token/general_auth",
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        }
      ).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.token) {
            saveToken(responseJson.token)
            checkForToken()
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
  // //setting > disable notifications, instead of the company name internship add a select w companies
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.loginView} bounces={false}>
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
          <Text style={[styles.buttonText, { color: colors.secondary.nearBlack }]}  >Log in</Text>
        </TouchableOpacity>
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
    borderRadius: 10
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
