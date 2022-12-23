import React from 'react'
import axios, * as others from 'axios';
import { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { SearchBar } from '@rneui/themed';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import InternshipsFilter from './InternshipsFilter';
import InternshipList from './InternshipList';
import { colors, components } from '../../styles/globalStyle'

export default function InternshipMain(props) {
  const [searchText, setSearchText] = useState('')
  const updateSearch = (text) => {
    setSearchText(text)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={components.screenHeader}>INTERNSHIPS</Text>
        <SearchBar
          onChangeText={updateSearch}
          value={searchText}
          placeholder={'Search'}
          placeholderTextColor={colors.secondary.lightGrey}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          searchIcon={
            <FaIcon name={'search'} size={18} color={colors.secondary.lightGrey} />
          }
        />
        <InternshipsFilter />
        <InternshipList {...props} />
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  },
  searchContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: '#424242',
  },
  inputStyle: {
    color: colors.secondary.lightGrey
  }
})
