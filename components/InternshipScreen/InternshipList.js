import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../utils/InternshipListItem'
import internships from '../../utils/internshipsTestJson'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function InternshipsAvailable(props) {
  const styles = getStyles(useBottomTabBarHeight())

  return (
    <View style={styles.container}>
      {internships.map((internship, index) => <InternshipListItem {...props} internship={internship} parentRoute={useRoute().name} key={index} />)}
    </View>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingBottom: bottomTabHeight + 10
  }
})