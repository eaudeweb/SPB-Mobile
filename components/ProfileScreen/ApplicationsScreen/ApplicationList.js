import React from 'react'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../../utils/InternshipListItem'
import internships from '../../../utils/internshipsTestJson'
export default function ApplicationList(props) {

  return (
    <ScrollView style={{ paddingVertical: 10 }}>
      {internships.map((internship, index) => <InternshipListItem {...props} index={index} internship={internship} swipeable={true} parentRoute={useRoute().name} key={index} />)}
    </ScrollView>
  )
}
