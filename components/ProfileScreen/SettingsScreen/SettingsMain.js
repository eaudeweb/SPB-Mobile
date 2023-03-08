import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableHighlight, ScrollView, Platform } from 'react-native'
import FeedbackModal from './FeedbackModal'
import { NotificationsRadioInput } from './RadioInputs'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import { loginActions } from '../../../features/login/loginSlice'
import { internshipsActions } from '../../../features/internships/internshipsSlice'
import { companiesActions } from '../../../features/companies/companiesSlice'
import { eventsActions } from '../../../features/events/eventsSlice'
import { profileActions } from '../../../features/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import tokenLogic from '../../../utils/tokenLogic'
import { colors, font } from '../../../styles/globalStyle'
import { deleteNotificationToken } from '../../../features/login/loginSlice'
import { color } from 'react-native-reanimated'

export default function SettingsMain({ navigation, rootNavigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const dispatch = useDispatch()
  const { notificationToken } = useSelector(state => state.login)
  const getExpoToken = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token
  }
  useEffect(() => {
    getExpoToken().then(token => setExpoPushToken(token))
  }, [])

  const styles = getStyles(useBottomTabBarHeight())
  const handleLogOut = () => {
    dispatch(loginActions.resetLogin())
    dispatch(deleteNotificationToken(notificationToken.id))
    navigation.navigate('Login')
    tokenLogic.deleteToken()
    dispatch(internshipsActions.resetInternships())
    dispatch(companiesActions.resetCompanies())
    dispatch(eventsActions.resetEvents())
    dispatch(profileActions.resetProfile())
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Notifications</Text>
        <NotificationsRadioInput
          setModalVisible={setModalVisible}
        />
      </View>
      <TouchableHighlight
        style={[styles.button, { backgroundColor: colors.indicators.red, width: '30%' }]}
        onPress={handleLogOut}>
        <Text style={styles.labelText}>Log out</Text>
      </TouchableHighlight>

    </SafeAreaView>

  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios' ? bottomTabHeight * 1.5 : bottomTabHeight + 10,

  },
  headerText: {
    fontSize: font.size.l,
    color: colors.main.white,
    marginVertical: 10
  },
  labelText: {
    color: 'white',
    fontSize: font.size.m,
    marginVertical: 5,
    fontFamily: 'Basier Square Medium'
  },
  inputContainer: {
    borderRadius: 5,
    backgroundColor: '#424242',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: '#4D565D',
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#424242",
    borderRadius: 10,
    width: '90%',
    alignItems: "center",
    paddingVertical: 16
  },
  textStyle: {
    color: colors.main.white,
    textAlign: "center",
    fontFamily: 'Basier Square Bold'
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5
  }
})
