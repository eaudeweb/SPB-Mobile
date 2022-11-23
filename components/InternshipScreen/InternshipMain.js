import React from 'react'
import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { SearchBar } from '@rneui/themed';
import InternshipsFilter from './InternshipsFilter';
import InternshipList from './InternshipList';
import { createStackNavigator } from '@react-navigation/stack';

export default function InternshipMain(props) {
  const [searchText, setSearchText] = useState('')
  const updateSearch = (text) => {
    setSearchText(text)
  }
  const Stack = createStackNavigator();

  return (
    <View>
      <SearchBar
        onChangeText={updateSearch}
        value={searchText}
        placeholder={'Search'}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ color: 'white' }}
      />
      <InternshipsFilter />
      <InternshipList {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    marginHorizontal: 10,

  },
  inputContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#757575',
    borderRadius: 8,
    backgroundColor: '#424242',

  }
})
