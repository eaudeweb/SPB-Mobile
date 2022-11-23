import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import InternshipPage from '../../utils/InternshipDetail'

export default function InternshipDetail(props) {
  return (
    <View style={styles.container}>
      <InternshipPage {...props} />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
