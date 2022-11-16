import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';
import Collapsible from 'react-native-collapsible';

export default function InternshipsFilter() {
  const categoriesData = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
  ];
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true)
  const [filter, setFilter] = useState({
    categories: null,
    cities: null,
    companies: null
  });
  const [isFocus, setIsFocus] = useState({
    categories: false,
    cities: false,
    companies: false
  });

  return (
    <View>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10 }} onPress={() => setIsFilterCollapsed(!isFilterCollapsed)}>
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
      </Collapsible>
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
