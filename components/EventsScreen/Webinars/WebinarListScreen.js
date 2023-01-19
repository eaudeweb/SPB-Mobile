import React from 'react'
import { StyleSheet, ScrollView, View, TouchableHighlight, Text } from 'react-native'
import EventListItem from '../../../utils/EventListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

export default function WebinarListScreen(props, { navigation }) {
  const { webinars } = useSelector(state => state.events)

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
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight + 20 : bottomTabHeight
  }
})
