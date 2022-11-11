import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { SearchBar } from '@rneui/themed';


export default function InternshipsScreen() {
  const [searchText, setSearchText] = useState('')
  const updateSearch = (text) => {
    setSearchText(text)
  }

  return (
    <ScrollView>
      <SearchBar
        onChangeText={updateSearch}
        value={searchText}
        placeholder={'Search'}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ color: 'white' }}
      />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    marginHorizontal: 15,

  },
  inputContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#757575',
    borderRadius: 8,
  }
})