import React from 'react'
import { StyleSheet, ScrollView, View, TouchableHighlight, Text } from 'react-native'
import EventListItem from '../../../utils/EventListItem'

export default function EventsListScreen(props) {
  const events = [
    {
      type: 'event',
      name: 'React native event',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      address: 'strada Maior Gheorghe Sontu 8',
      availableSeats: "150/200"
    },
    {
      type: 'event',
      name: 'Advanced react hooks',
      company: 'Eau de Web',
      date: '12/14/2022',
      time: '14:00',
      address: 'strada Maior Gheorghe Sontu 8',
      availableSeats: "21/200"
    },
    {
      type: 'event',
      name: 'React native event',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      address: 'strada Maior Gheorghe Sontu 8',
      availableSeats: "150/200"
    },
    {
      type: 'event',
      name: 'Advanced react hooks',
      company: 'Eau de Web',
      date: '12/14/2022',
      time: '14:00',
      address: 'strada Maior Gheorghe Sontu 8',
      availableSeats: "21/200"
    },
    {
      type: 'event',
      name: 'React native event',
      company: 'Eau de Web',
      date: '12/12/2022',
      time: '14:00',
      address: 'strada Maior Gheorghe Sontu 8',
      availableSeats: "150/200"
    }
  ]

  return (
    <ScrollView style={styles.container}>
      {events.map((event, index) => <EventListItem event={event} key={index} {...props} />)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10
  }
})
