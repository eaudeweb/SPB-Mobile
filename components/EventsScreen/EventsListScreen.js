import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, StatusBar, Text } from 'react-native'
import EventListItem from '../../utils/EventListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { colors, spacing, font, components } from '../../styles/globalStyle';
import Loading from './Loading';
import { getEvents } from '../../features/events/eventsSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';
export default function EventsListScreen(props) {
  const { events, isLoading } = useSelector(state => state.events)
  const styles = getStyles(useBottomTabBarHeight())
  const dispatch = useDispatch()
  const eventsExist = () => {
    const { upcoming, reserved, recordings } = events
    if (upcoming?.length || reserved?.length || recordings?.length) {
      return true
    } else {
      return false
    }
  }
  const Events = () => {


  }
  useEffect(() => {
    dispatch(getEvents())
  }, [])
  const EventSectionItem = ({ eventsType, events }) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>{eventsType}</Text>
        {events.map((event, index) => <EventListItem event={event} key={index} {...props} />)}
      </View>
    )
  }
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={components.screenHeader}>EVENTS</Text>
        <Loading />
      </SafeAreaView >
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <Text style={components.screenHeader}>EVENTS</Text>
        <View >
          {events.upcoming?.length ? <EventSectionItem eventsType={"Upcoming"} events={events.upcoming} /> : ''}
          {events.reserved?.length ? <EventSectionItem eventsType={"Reserved"} events={events.reserved} /> : ''}
          {events.recordings?.length ? <EventSectionItem eventsType={"Recordings"} events={events.recordings} /> : ''}
        </View>
      </ScrollView>
    </SafeAreaView >

  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight : bottomTabHeight + 10
  },
  sectionHeader: {
    color: colors.main.accent,
    marginHorizontal: spacing.s,
    fontSize: font.size.l,
    fontWeight: font.fontWeight.bold,
    marginVertical: 10
  }
})
