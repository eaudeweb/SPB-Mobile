import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { colors, font } from '../../styles/globalStyle';
import FilterModal from '../../utils/FilterModal'

export default function InternshipsFilter(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalFilter, setModalFilter] = useState(null)
  const { filterData, setFilterData } = props

  const handleFilterTap = (filterCategory) => {
    setModalFilter(filterCategory)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.filterDescriptionText}>FILTER BY: </Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterTap('categories')}>
          {filterData.categories.length > 0 ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>Categories</Text>
              <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{filterData.categories.length}</Text>
              </View>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>Categories</Text>
            </View>
          }

        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterTap('city')}>
          {filterData.cities.length > 0 ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>City</Text>
              <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{filterData.cities.length}</Text>
              </View>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>City</Text>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterTap('companies')}>
          {filterData.companies.length > 0 ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>Companies</Text>
              <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{filterData.companies.length}</Text>
              </View>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>Companies</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
      {/* TODO implement multi select, integrate with redux */}
      <FilterModal
        {...props}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalFilter={modalFilter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
