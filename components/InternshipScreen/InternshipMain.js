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
import Loading from './Loading';
import { getAllPartnerCompanies } from '../../features/companies/companiesSlice';
import { getInternshipsBySearch } from '../../features/internships/internshipsSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function InternshipMain(props) {
  const styles = getStyles(useBottomTabBarHeight())
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const { internships, isLoading } = useSelector(state => state.internships)
  const { locations, categories, internshipsFilter } = useSelector(state => state.filters)
  const test = () => {
    const availableFilters = {
      category: internshipsFilter.category,
      location: internshipsFilter.location,
      company: internshipsFilter.company
    }
    dispatch(getInternshipsBySearch(availableFilters))
  }
  const getAvailableCategories = (internships) => {
    const categoriesIds = []
    internships.forEach(internship => {
      internship.categories.forEach(category => {
        if (categories.includes(category)) {
          // alert('deja e')
        } else {
          categoriesIds.push(category)
        }
      })
    })
    const finalCategories = categories.filter(category => categoriesIds.includes(category.id))
    return finalCategories
  }

  const getAvailableLocations = (internships) => {
    const locationSlugs = []
    internships.forEach(internship => {
      internship.location.forEach(location => {
        if (locations.includes(location)) {
          // alert('deja e')
        } else {
          locationSlugs.push(location)
        }
      })
    })
    const finalLocations = locations.filter(location => locationSlugs.includes(location.slug))
    return finalLocations
  }
  const getAvailableCompanies = (internships) => {
    const companiesArr = []
    internships.forEach(internship => {
      if (!companiesArr.find(company => company.id === internship.company.id)) {
        companiesArr.push({ name: internship.company.name, id: internship.company.id })
      }
    })
    return companiesArr
  }

  //TODO cities/categories/companies use form 
  // TODO add clear filters button/option 
  const updateSearch = (text) => {
    setSearchText(text)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={components.screenHeader}>{true && 'INTERNSHIPS'}</Text>
        {/* TODO implement search bar  */}
        <TouchableOpacity style={{ backgroundColor: 'dodgerblue', padding: 20 }} onPress={test}>
          <Text>GET INTERNSHIPS BY FILTER</Text>
        </TouchableOpacity>
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
        <InternshipsFilter categories={getAvailableCategories(internships)} locations={getAvailableLocations(internships)} companies={getAvailableCompanies(internships)} />
        {isLoading ?
          <Loading />
          :
          <InternshipList {...props} />
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
