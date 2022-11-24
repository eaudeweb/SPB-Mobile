import { View } from 'react-native'
import React from 'react'
import InternshipDetail from '../../../utils/InternshipDetail'

export default function ApplicationDetail(props) {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <InternshipDetail {...props} />
    </View>
  )
}