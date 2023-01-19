import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native'
import { SearchBar } from '@rneui/themed';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import InternshipsFilter from './InternshipsFilter';
import InternshipList from './InternshipList';
import { colors, components } from '../../styles/globalStyle'
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getAllInternships } from '../../features/internships/internshipsSlice';
import Loading from './Loading';

export default function InternshipMain(props) {
  const styles = getStyles(useBottomTabBarHeight())
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [filteredInternships, setFilteredInternships] = useState([])
  const { isLoading } = useSelector(state => state.internships)
  //TODO cities/categories/companies use form 

  useEffect(() => {
    dispatch(getAllInternships())
  }, [])

  // TODO add clear filters button/option 
  const [filterData, setFilterData] = useState({
    categories: [1],
    cities: [],
    companies: ['Eau de Web', "Lenovo"]
  });

  const updateSearch = (text) => {
    setSearchText(text)
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={components.screenHeader}>INTERNSHIPS</Text>
        {/* TODO implement search bar  */}
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
        <InternshipsFilter
          filterData={filterData}
          setFilterData={setFilterData}
          filteredInternships={filteredInternships}
        />

        {/* TODO infinite scroll  */}
        {isLoading ?
          <Loading />
          :
          <InternshipList {...props}
            filteredInternships={filteredInternships}
            setFilteredInternships={setFilteredInternships}
            filterData={filterData}
            setFilterData={setFilterData}
          />
        }
      </ScrollView>

    </SafeAreaView>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
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
