import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, Image, View, Text } from 'react-native'
import InternshipPage from '../../utils/InternshipDetail'

export default function InternshipDetail(props) {
  return (
    <SafeAreaView style={styles.container}>
      <InternshipPage {...props} />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight
  }
})
