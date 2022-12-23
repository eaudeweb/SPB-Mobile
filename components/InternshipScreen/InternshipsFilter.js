import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';
import Collapsible from 'react-native-collapsible';
import { colors, font } from '../../styles/globalStyle';

export default function InternshipsFilter() {
  const categoriesData = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
  ];
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true)
  const [filter, setFilter] = useState({
    categories: [1, 1, 1, , 1, 1],
    cities: [],
    companies: [1, 1]
  });
  const [isFocus, setIsFocus] = useState({
    categories: false,
    cities: false,
    companies: false
  });

  return (
    <View style={styles.container}>
      <Text style={styles.filterDescriptionText}>FILTER BY: </Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity>
          {filter.categories.length > 0 ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>Categories</Text>
              <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{filter.categories.length}</Text>
              </View>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>Categories</Text>
            </View>
          }

        </TouchableOpacity>
        <TouchableOpacity>
          {filter.cities.length > 0 ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>City</Text>
              <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{filter.cities.length}</Text>
              </View>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>City</Text>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity>
          {filter.companies.length > 0 ?
            <View style={styles.filterButtonActive}>
              <Text style={styles.filterTextActive}>Companies</Text>
              <View style={styles.filterNumberCounter}>
                <Text style={styles.filterNumberCounterText}>{filter.companies.length}</Text>
              </View>
            </View>
            :
            <View style={styles.filterButton}>
              <Text style={styles.filterText}>Companies</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10 }} onPress={() => setIsFilterCollapsed(!isFilterCollapsed)}>
        <Text style={{ color: '#F26649', fontSize: 18 }}>Filter:</Text>
        <Ionicon name={isFilterCollapsed ? 'chevron-down' : 'chevron-up'} size={26} color='#F26649' />
      </TouchableOpacity>
      <Collapsible collapsed={isFilterCollapsed}>
        <View style={styles.dropDownView}>
          <Dropdown
            style={[styles.dropdown, isFocus.categories && { borderColor: '#F26649' }]}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.dropdownContainer}
            selectedTextStyle={styles.selectedTextStyle}
            data={categoriesData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Categories'
            value={filter.categories}
            onFocus={() => setIsFocus({ ...isFocus, categories: true })}
            onBlur={() => setIsFocus({ ...isFocus, categories: false })}
            onChange={item => {
              setFilter({ ...filter, categories: item.value });
              setIsFocus({ ...isFocus, categories: false })
            }}
          />
        </View>
        <View style={styles.dropDownView}>
          <Dropdown
            style={[styles.dropdown, isFocus.cities && { borderColor: '#F26649' }]}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.dropdownContainer}
            selectedTextStyle={styles.selectedTextStyle}
            data={categoriesData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Cities'
            value={filter.cities}
            onFocus={() => setIsFocus({ ...isFocus, cities: true })}
            onBlur={() => setIsFocus({ ...isFocus, cities: false })}
            onChange={item => {
              setFilter({ ...filter, cities: item.value });
              setIsFocus({ ...isFocus, cities: false })
            }}
          />
        </View>
        <View style={styles.dropDownView}>
          <Dropdown
            style={[styles.dropdown, isFocus.companies && { borderColor: '#F26649' }]}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.dropdownContainer}
            selectedTextStyle={styles.selectedTextStyle}
            data={categoriesData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Companies'
            value={filter.companies}
            onFocus={() => setIsFocus({ ...isFocus, companies: true })}
            onBlur={() => setIsFocus({ ...isFocus, companies: false })}
            onChange={item => {
              setFilter({ ...filter, companies: item.value });
              setIsFocus({ ...isFocus, companies: false })
            }}
          />
        </View>
      </Collapsible> */}
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



const stylesz = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,

  },
  inputContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#757575',
    borderRadius: 8,
    backgroundColor: '#424242',
  },
  dropDownView: {
    marginBottom: 15
  },
  dropdown: {
    height: 50,
    borderColor: '#757575',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#424242',
    color: 'white',
    marginHorizontal: 15,
  },
  dropdownContainer: {
    paddingHorizontal: 15
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white'

  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
})
