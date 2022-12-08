import React from 'react'
import { StyleSheet, ScrollView, View, TouchableHighlight, Text } from 'react-native'
import EventListItem from '../../../utils/EventListItem'

export default function WebinarListScreen(props, { navigation }) {
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

  return (
    <ScrollView style={styles.container}>
      {webinars.map((webinar, index) => <EventListItem key={index} event={webinar} {...props} />)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10
  }
})
