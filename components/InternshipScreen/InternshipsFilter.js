import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { colors, font } from '../../styles/globalStyle';
import FilterModal from './FilterModal'
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../features/filters/filtersSlice';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { getInternshipsBySearch } from '../../features/internships/internshipsSlice';

export default function InternshipsFilter(props) {
  const dispatch = useDispatch()
  const { internshipsFilter } = useSelector(state => state.filters)
  const { isLoading } = useSelector(state => state.internships)
  const { updateSelectedFilter, updateFilterList } = filtersActions
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const { wasSearchUsed, setWasSearchUsed, setSearchText } = props
  const handleFilterTap = (filterCategory) => {
    dispatch(updateSelectedFilter(filterCategory))
    setModalVisible(true)
  }
  const handleAllFiltersClear = () => {
    const clearedFilters = {
      category: '',
      location: '',
      company: '',
      search: ''
    }
    setSearchText('')
    setWasSearchUsed(false)
    dispatch(updateFilterList(clearedFilters))
    dispatch(getInternshipsBySearch(clearedFilters))
  }
  const areFiltersActive = () => {
    const { category, location, company } = internshipsFilter
    if (category || location || company || wasSearchUsed) return true
  }
  return (
    <View style={styles.container}>
      <Text style={styles.filterDescriptionText}>FILTER BY: </Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterTap('categories')} disabled={isLoading}>
          {internshipsFilter.category.name ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>Categories</Text>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>Categories</Text>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterTap('city')} disabled={isLoading}>
          {internshipsFilter.location.name ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>City</Text>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>City</Text>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterTap('companies')} disabled={isLoading}>
          {internshipsFilter.company.name ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>Companies</Text>
              {/* <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{internshipsFilter.companies.length}</Text>
              </View> */}
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>Companies</Text>
            </View>
          }
        </TouchableOpacity>
        {
          areFiltersActive() ?
            <TouchableOpacity onPress={() => handleAllFiltersClear()}>
              <View style={styles.filterButtonActive}>
                <FaIcon name={'times'} size={18} color={colors.main.accent} />

              </View>
            </TouchableOpacity>
            :
            ''
        }
      </View>
      <FilterModal
        {...props}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedFilter={selectedFilter}
        setWasSearchUsed={setWasSearchUsed}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20
  },
  filterDescriptionText: {
    color: colors.secondary.lightGrey
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 5
  },
  filterButtonActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.buttonBackground.orange,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 5
  },
  filterText: {
    fontSize: font.size.m,
    color: colors.secondary.lightGrey
  },
  filterTextActive: {
    fontSize: font.size.m,
    color: colors.main.cappuccino
  },
  filterNumberCounter: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondary.darkGrey,
    marginLeft: 5,
  },
  filterNumberCounterText: {
    fontSize: font.size.xs,
    fontWeight: font.fontWeight.xbold,
    color: colors.main.cappuccino
  }
})
