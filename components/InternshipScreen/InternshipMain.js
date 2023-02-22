import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, View, StatusBar, Text, RefreshControl } from 'react-native'
import { SearchBar } from '@rneui/themed';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import InternshipsFilter from './InternshipsFilter';
import InternshipList from './InternshipList';
import { colors, components } from '../../styles/globalStyle'
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Loading from './Loading';
import { filtersActions } from '../../features/filters/filtersSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getInternshipsBySearch, refreshInternshipsBySearch } from '../../features/internships/internshipsSlice';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import tokenLogic from '../../utils/tokenLogic';
export default function InternshipMain(props) {
  const styles = getStyles(useBottomTabBarHeight())
  const { locations, categories, internshipsFilter } = useSelector(state => state.filters)
  const { companies } = useSelector(state => state.companies)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState(internshipsFilter.search)
  const [wasSearchUsed, setWasSearchUsed] = useState(false)
  const { internships, isLoading, isRefreshLoading } = useSelector(state => state.internships)
  const { updateFilterList } = filtersActions
  const [currentFilters, setCurrentFilters] = useState(internshipsFilter)

  const onRefresh = () => {
    dispatch(refreshInternshipsBySearch(internshipsFilter))
  }

  const updateSearch = (text) => {
    const newFilters = {
      ...internshipsFilter,
      search: text
    }
    dispatch(updateFilterList(newFilters))
    setSearchText(text)
  }
  const handleSearch = () => {
    setWasSearchUsed(true)
    dispatch(getInternshipsBySearch(internshipsFilter))
  }
  const getAvailableCategories = (internships) => {
    const categoriesIds = []
    internships.forEach(internship => {
      internship.categories.forEach(category => {
        if (categories.includes(category)) {
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
    // const mainPartnerCompanies = companies.filter(company => company.status === 2)
    // const regularPartners = companies.filter(company => company.status === 1)
    //TODO REVISIT THIS AND REFACTOR TO A MORE EFFICIENT SOLUTION
    const filteredCompaniesArr = []
    companies.mainPartners?.forEach(partnerCompany => {
      companiesArr.find(company => company.id === partnerCompany.id) ?
        filteredCompaniesArr.push({ name: partnerCompany.name, id: partnerCompany.id })
        :
        ''
    })
    companies.partners?.forEach(partnerCompany => {
      companiesArr.find(company => company.id === partnerCompany.id) ?
        filteredCompaniesArr.push({ name: partnerCompany.name, id: partnerCompany.id })
        :
        ''
    })
    companiesArr.forEach(company => {
      if (!filteredCompaniesArr.find(partnerCompany => partnerCompany.id === company.id)) {
        filteredCompaniesArr.push(company)

      }
    })

    return filteredCompaniesArr
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshLoading} onRefresh={onRefresh} />
        }
      >
        <Text style={components.screenHeader}>INTERNSHIPS</Text>
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <SearchBar
              onChangeText={updateSearch}
              value={searchText}
              placeholder={'Search'}
              placeholderTextColor={colors.secondary.lightGrey}
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              searchIcon={
                ''
              }
              showLoading={isLoading}
            />
          </View>
          {
            internshipsFilter.search ?
              <TouchableOpacity style={{ justifyContent: 'center', padding: 10 }} onPress={handleSearch}>
                <View style={{ justifyContent: 'center', padding: 10 }}>
                  <FaIcon name={'search'} size={26} color={colors.secondary.lightGrey} />
                </View>
              </TouchableOpacity>
              :
              ''
          }
        </View>
        <InternshipsFilter
          categories={getAvailableCategories(internships)}
          locations={getAvailableLocations(internships)}
          companies={getAvailableCompanies(internships)}
          wasSearchUsed={wasSearchUsed}
          setWasSearchUsed={setWasSearchUsed}
          setSearchText={setSearchText}
        />
        {isLoading ?
          <Loading />
          :
          <InternshipList {...props} />
        }
      </ScrollView>
    </SafeAreaView >
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
