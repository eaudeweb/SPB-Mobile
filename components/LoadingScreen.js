import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import { colors, spacing, font } from '../styles/globalStyle';
import * as SecureStore from 'expo-secure-store';
import tokenLogic from '../utils/tokenLogic';

function LoadingScreen({ navigation }) {
  const customWidth = Dimensions.get('window').width - (spacing.xl * 2)
  useEffect(() => {
    checkForToken()
      .catch(err => console.log(err))
  }, [])

  const checkForToken = async () => {
    const token = await tokenLogic.getToken().catch(error => console.log(error))
    if (token) {
      navigation.navigate('Layout')
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container} >
      <SvgLogo style={styles.logo} customSize={{ width: customWidth, height: customWidth / 3 }} />
      <ActivityIndicator style={{ transform: [{ scale: 2 }] }} size="large" color={colors.main.accent} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xl
  },
  logo: {
    marginTop: 40,
    marginBottom: 60
  }
})

export default LoadingScreen
