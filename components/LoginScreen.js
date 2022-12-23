import React from 'react'
import { useEffect } from 'react'
import { StatusBar, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import OrangeStrokeSvg from '../assets/OrangeStroke'
import { colors, spacing, font } from '../styles/globalStyle';


function LoginScreen({ navigation, isUserLogged, setIsUserLogged }) {
  useEffect(() => {
    isUserLogged ?? navigation.navigate('Layout')
  }, [isUserLogged])
  const onLogin = () => {
    navigation.navigate('Layout')
    setIsUserLogged(true)
  }
  const customWidth = Dimensions.get('window').width - (spacing.xl * 2)



  const get_set_cookies = function (headers) {
    const set_cookies = []
    for (const [name, value] of headers) {
      if (name === "set-cookie") {
        set_cookies.push(value)
      }
    }
    return set_cookies
  }

  const getInternships = async () => {
    try {
      const response = await fetch(
        "https://staging.stagiipebune.ro/login/",
        {
          headers: {
            Authorization: "Basic " + btoa(uname + ":" + pword),
          },
          credentials: 'include'
        }
      );
      const set_cookies = get_set_cookies(response.headers)
      // data = await response.json();

      const csrf_token = set_cookies[0].split('csrftoken=')[1]
      const internshipResponse = await fetch(
        "https://staging.stagiipebune.ro/api/v1/students/jobs/",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRF-TOKEN': csrf_token
          },
          credentials: 'include',
        }

      );
      console.log({ response, csrf_token, internshipResponse }, window);
      // console.log(data.name);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };



  return (
    <View style={styles.loginView}>
      <SvgLogo style={styles.logo} customSize={{ width: customWidth, height: customWidth / 3 }} />
      <View style={styles.content}>
        <Text style={styles.sloganText}>zee <Text style={{ color: colors.main.cappuccino }}>first,</Text></Text>
        <Text style={[styles.sloganText, { color: colors.main.cappuccino }]}>popular,</Text>
        <Text style={[styles.sloganText, { color: colors.main.cappuccino }]}>leading</Text>
        <OrangeStrokeSvg />
      </View>
      <View style={[styles.content, { marginTop: 10 }]}>
        <Text style={[styles.sloganText, { color: colors.main.turquoise }]}>internship</Text>
        <Text style={[styles.sloganText, { color: colors.main.turquoise }]}>program in</Text>
        <Text style={[styles.sloganText, { color: colors.main.turquoise }]}>the country</Text>
      </View>

      <View style={[styles.content, { marginTop: 60 }]}>
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={[styles.buttonText, { color: colors.secondary.nearBlack }]}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButton, { backgroundColor: 'transparent' }]} onPress={getInternships}>
          <Text style={[styles.buttonText, { color: colors.main.cappuccino }]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View >
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
  }
})

export default LoginScreen
