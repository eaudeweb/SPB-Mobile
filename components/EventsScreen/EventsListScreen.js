import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, StatusBar, Text, ActivityIndicator, RefreshControl } from 'react-native'
import EventListItem from '../../utils/EventListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { colors, spacing, font, components } from '../../styles/globalStyle';
import Loading from './Loading';
import { getEvents, getRefreshedEvents } from '../../features/events/eventsSlice';
import { useDispatch } from 'react-redux';

export default function EventsListScreen(props) {
  const { events, booking, isLoading, isRefreshLoading } = useSelector(state => state.events)
  const styles = getStyles(useBottomTabBarHeight())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  const onRefresh = () => {
    dispatch(getRefreshedEvents())
  }
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshLoading} onRefresh={onRefresh} />
        }
        style={{ minHeight: '100%' }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={components.screenHeader}>EVENTS </Text>
          {booking.isLoading ? <ActivityIndicator size="small" color={colors.main.accent} /> : ''}
        </View>
        <View >
          {events.upcoming?.length ? <EventSectionItem eventsType={"Upcoming"} events={events.upcoming} /> : ''}
          {events.reserved?.length ? <EventSectionItem eventsType={"Reserved"} events={events.reserved} /> : ''}
          {events.recordings?.length ? <EventSectionItem eventsType={"Recordings"} events={events.recordings} /> : ''}
          {!events.upcoming?.length && !events.reserved?.length ? <Text style={styles.text}>No events available at the moment.
          </Text> : ''}
        </View>
      </ScrollView>
    </SafeAreaView >

  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    marginBottom: Platform.OS === 'ios' ? bottomTabHeight * 1.5 : bottomTabHeight + 10,
    marginHorizontal: 10
  },
  sectionHeader: {
    color: colors.main.accent,
    marginHorizontal: spacing.s,
    fontSize: font.size.l,
    fontWeight: font.fontWeight.bold,
    marginVertical: 10
  },
  text: {
    color: colors.main.white,
    fontSize: font.size.m,
    marginHorizontal: 10
  }
})
