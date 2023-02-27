import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { profileActions } from '../../../features/profile/profileSlice'
import { updateMobileNoficiations } from '../../../features/profile/profileSlice'
import { addNotificationToken, deleteAllNotificationTokens } from '../../../features/login/loginSlice'
import jwtDecode from 'jwt-decode'
import * as Notifications from 'expo-notifications';
import tokenLogic from '../../../utils/tokenLogic'

const NotificationsRadioInput = (props) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.profile)
  const { mobile_notifications } = useSelector(state => state.profile.data)
  const getNotificationTokenData = async () => {
    const authTokenExpiration = jwtDecode(await tokenLogic.getToken()).exp * 1000
    const expo_token = (await Notifications.getExpoPushTokenAsync()).data
    const data = {
      expiry_date: new Date(authTokenExpiration).toISOString(),
      expo_token: expo_token
    }
    return data
  }

  const notificationModalOptions = [
    {
      key: 'on',
      text: 'On'
    },
    {
      key: 'off',
      text: 'Off'
    }
  ]
  const handleRadioPress = (option) => {
    dispatch(profileActions.updateReduxMobileNotifications(option.key))
    dispatch(updateMobileNoficiations(option.key))
    if (option.key === 'off') {
      dispatch(deleteAllNotificationTokens())
    } else {
      dispatch(addNotificationToken(getNotificationTokenData()))

    }
  }

  return (
    <View style={{ width: '100%' }}>
      {notificationModalOptions?.map(option => {
        return (
          <TouchableOpacity key={option.key} style={radioStyle.container} onPress={() => handleRadioPress(option)}>
            <View
              style={radioStyle.radioCircle}
            >
              {mobile_notifications === option.key && <View style={radioStyle.selectedRb} />}
            </View>
            <Text style={radioStyle.radioText}>{option.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const FeedbackRadioInput = (props) => {
  const { feedbackProvided, setFeedbackProvided } = props
  const feedbackModalOptions = [
    {
      key: false,
      text: 'No'
    },
    {
      key: true,
      text: 'I got an internship'
    }
  ]

  const handleRadioPress = (option) => {
    setFeedbackProvided(option.key)
  }
  return (
    <View style={{ width: '100%' }}>
      {feedbackModalOptions?.map(option => {
        return (
          <TouchableOpacity key={option.key} style={radioStyle.container} onPress={() => handleRadioPress(option)}>
            <View
              style={radioStyle.radioCircle}
            >
              {feedbackProvided === option.key && <View style={radioStyle.selectedRb} />}
            </View>
            <Text style={radioStyle.radioText}>{option.text}</Text>

          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const radioStyle = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  radioText: {
    fontSize: 20,
    color: 'white',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#9e9e9e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#F26649',
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});

export { FeedbackRadioInput, NotificationsRadioInput }