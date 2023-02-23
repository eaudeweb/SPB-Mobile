import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const NotificationsRadioInput = (props) => {
  const { setModalVisible, notificationsActive, setNotificationsActive } = props
  const notificationModalOptions = [
    {
      key: true,
      text: 'On'
    },
    {
      key: false,
      text: 'Off'
    }
  ]

  const handleRadioPress = (option) => {
    setNotificationsActive(option.key)
    if (!option.key) {
      setModalVisible(true)
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
              {notificationsActive === option.key && <View style={radioStyle.selectedRb} />}
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