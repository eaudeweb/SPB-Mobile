import React from 'react'
import { StyleSheet, ScrollView, View, TouchableHighlight, Text } from 'react-native'
import EventListItem from '../../../utils/EventListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

export default function EventsListScreen(props) {
  const { events } = useSelector(state => state.events)
  const styles = getStyles(useBottomTabBarHeight())

  return (
    <ScrollView >
      <View style={styles.container}>
        {events.map((event, index) => <EventListItem event={event} key={index} {...props} />)}
      </View>
    </ScrollView>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    margin: 10,
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight + 20 : bottomTabHeight
  }
})
