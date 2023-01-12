import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../../utils/InternshipListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux'

export default function ApplicationList(props) {
  const styles = getStyles(useBottomTabBarHeight())

  const { internshipsAppliedTo } = useSelector(state => state.internships)

  return (
    <View style={styles.container}>
      <ScrollView >
        {internshipsAppliedTo.map((internship, index) => <InternshipListItem {...props} index={index} internship={internship} swipeable={true} parentRoute={useRoute().name} key={index} />)}
      </ScrollView>
    </View>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight - 20 : 10
  }
})
