import React from 'react'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../../utils/InternshipListItem'
import { useSelector } from 'react-redux'

export default function ApplicationList(props) {
  const { internshipsAppliedTo } = useSelector(state => state.internships)
  return (
    <ScrollView style={{ paddingVertical: 10 }}>
      {internshipsAppliedTo.map((internship, index) => <InternshipListItem {...props} index={index} internship={internship} swipeable={true} parentRoute={useRoute().name} key={index} />)}
    </ScrollView>
  )
}
