import React from 'react'
import { StyleSheet, ScrollView, View, TouchableHighlight, Text } from 'react-native'
import EventListItem from '../../../utils/EventListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function WebinarListScreen(props, { navigation }) {
  // TODO move to redux 
  const webinars = [
    {
      type: 'webinar',
      name: 'Intro to React',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      availableSeats: "150/200"
    },
    {
      type: 'webinar',
      name: 'Intro to React',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      availableSeats: "150/200"
    },
    {
      type: 'webinar',
      name: 'Intro to React',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      availableSeats: "150/200"
    },
    {
      type: 'webinar',
      name: 'Intro to React',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      availableSeats: "150/200"
    },
    {
      type: 'webinar',
      name: 'Intro to React',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      availableSeats: "150/200"
    }
  ]

  const styles = getStyles(useBottomTabBarHeight())

  return (
    <ScrollView>
      <View style={styles.container}>
        {webinars.map((webinar, index) => <EventListItem key={index} event={webinar} {...props} />)}
      </View>
    </ScrollView>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    margin: 10,
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight - 20 : 0
  }
})
