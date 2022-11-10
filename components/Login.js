import React from 'react'
import { StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import { useNavigate } from 'react-router'

function Login({ isUserLogged, setIsUserLogged }) {
  const navigate = useNavigate()
  const onLogin = () => {
    setIsUserLogged(true)
    navigate('/')
  }
  return (
    <View style={styles.loginView}>
      <SvgLogo style={{ marginBottom: 32 }} />
      <TextInput style={styles.loginInput} placeholder="Email" placeholderTextColor="white" />
      <TextInput style={styles.loginInput} placeholder="Password" placeholderTextColor="white" secureTextEntry={true} />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Log in  </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#3E5998' }]} >
        <Text style={styles.loginButtonText}>Log in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginButtonText}>I forgot my password</Text>
      </TouchableOpacity>
    </View >
  )
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  text: {
    color: 'white'
  },
  loginInput: {
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#424242',
    color: 'white',
    borderWidth: 2,
    borderColor: "#616161",
    borderRadius: 8,
  },
  loginButton: {
    width: "80%",
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#F26649',
    color: 'white',
    borderRadius: 2,
    alignItems: 'center'
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold"
  }
})

export default Login
