import React, { useEffect } from 'react'
import { StyleSheet, View, Platform, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../utils/InternshipListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors, font } from '../../styles/globalStyle'
import { useSelector } from 'react-redux';

export default function InternshipsList(props) {
  const styles = getStyles(useBottomTabBarHeight())
  const { sortedInternships } = useSelector(state => state.internships)
  const { internshipsFilter } = useSelector(state => state.filters)

  return (
    <View style={styles.container}>
      {sortedInternships.length ?
        sortedInternships.map((item, index) => (
          <View key={index}>
            <Text style={styles.companyTitle}>{item.companyName}</Text>
            {item.internships?.map((internship, index) => <InternshipListItem {...props} internship={internship} parentRoute={useRoute().name} key={index} />)}
          </View>
        ))
        :
        <Text style={styles.text}>No internships available for you at the moment.</Text>}
    </View>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight : bottomTabHeight + 10
  },
  companyTitle: {
    color: colors.main.accent,
    fontSize: font.size.l,
    marginHorizontal: 10
  },
  text: {
    color: colors.main.white,
    fontSize: font.size.m,
    marginHorizontal: 10
  }
})
