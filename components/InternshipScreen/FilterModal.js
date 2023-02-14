import React, { useEffect, useState } from 'react'
import { StyleSheet, Pressable, View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Modal } from 'react-native'
import { colors, font } from '../../styles/globalStyle'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../features/filters/filtersSlice';
import { getInternshipsBySearch } from '../../features/internships/internshipsSlice';

export default function FilterModal(props) {
  const { modalVisible, setModalVisible, setWasSeachUsed } = props
  const { internships } = useSelector(state => state.internships)
  const { selectedFilter, internshipsFilter } = useSelector(state => state.filters)
  const dispatch = useDispatch()
  const { resetSelectedFilter, updateFilterList } = filtersActions
  const [currentFilters, setCurrentFilters] = useState({
    category: internshipsFilter.category,
    location: internshipsFilter.location,
    company: internshipsFilter.company,
    search: internshipsFilter.search
  })
  useEffect(() => {
    setCurrentFilters(internshipsFilter)
  }, [internshipsFilter])
  const handleSave = () => {
    if (currentFilters === internshipsFilter) {
      setModalVisible(false)
      return
    }
    dispatch(updateFilterList(currentFilters))
    dispatch(getInternshipsBySearch(currentFilters))
    setModalVisible(false)
  }
  const handleCancel = () => {
    dispatch(resetSelectedFilter())
    setCurrentFilters(internshipsFilter)
    setModalVisible(false)
  }

  const Option = ({ option, handlePress }) => (
    <TouchableHighlight onPress={handlePress}>
      <View style={styles.optionWrapper}>
        <Text style={styles.optionText}>{option}</Text>
      </View >
    </TouchableHighlight>
  )
  const SelectedOption = ({ option, handlePress }) => (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.optionWrapperSelected}>
        <Text style={styles.optionTextSelected}>{option}</Text>
        <FaIcon name={'check'} size={18} color={colors.indicators.green} />
      </View >
    </TouchableOpacity>
  )

  const handleFilterPress = (data, type) => {
    currentFilters[type].name === data.name ?
      setCurrentFilters((prevState) => ({
        ...prevState,
        [type]: ''
      }))
      :
      setCurrentFilters((prevState) => ({
        ...prevState,
        [type]: data
      }))
  }

  const handleClearFilter = () => {
    let filter
    switch (selectedFilter) {
      case 'categories':
        filter = 'category'
        break
      case 'city':
        filter = 'location'
        break
      case 'companies':
        filter = 'company'
        break
    }
    if (!currentFilters[filter]) {
      setModalVisible(false)
      return
    }
    const newFilters = {
      ...internshipsFilter,
      [filter]: ''
    }

    dispatch(updateFilterList(newFilters))
    dispatch(getInternshipsBySearch(newFilters))
    // setWasSeachUsed(false)
    setModalVisible(false)
  }
  const CompaniesFilter = () => {
    return props.companies.map((company, index) => {
      return currentFilters.company.name?.includes(company.name) ?
        <SelectedOption key={index} option={company.name} handlePress={() => handleFilterPress(company, 'company')} />
        :
        <Option key={index} option={company.name} handlePress={() => handleFilterPress(company, 'company')} />
    })

  }
  const CategoriesFilter = () => {
    return props.categories.map((category, index) => {
      return currentFilters.category.name?.includes(category.name) ?
        <SelectedOption key={index} option={category.name} handlePress={() => handleFilterPress(category, 'category')} />
        :
        <Option key={index} option={category.name} handlePress={() => handleFilterPress(category, 'category')} />
    })
  }
  const LocationsFilter = () => {
    return props.locations.map((location, index) => {
      return currentFilters.location === location ?
        <SelectedOption key={index} option={location.name} handlePress={() => handleFilterPress(location, 'location')} />
        :
        <Option key={index} option={location.name} handlePress={() => handleFilterPress(location, 'location')} />
    })
  }
  const capitalize = (string) => string?.charAt(0).toUpperCase() + string?.slice(1);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        swipeDirection="down"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, }}>
          <Pressable
            style={{ flex: 1 }}
            onPress={handleCancel} />
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{capitalize(selectedFilter)}</Text>
            <ScrollView style={{ width: '100%' }}>
              {selectedFilter === 'companies' && <CompaniesFilter />}
              {selectedFilter === 'city' && <LocationsFilter />}
              {selectedFilter === 'categories' && <CategoriesFilter />}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
              <TouchableHighlight style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Apply filter</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.saveButton, { backgroundColor: colors.indicators.red }]} onPress={handleClearFilter}>
                <Text style={styles.buttonText}>Clear filter</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </Modal >
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20
  },
  outerWrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalView: {
    maxHeight: '60%',
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    width: '100%',
    alignItems: "center",
    paddingVertical: 10
  },
  modalTitle: {
    color: colors.main.accent,
    fontSize: font.size.l,
  },
  optionWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  optionText: {
    color: colors.secondary.lightGrey,
    fontSize: font.size.l,
  },
  optionWrapperSelected: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.secondary.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5
  },
  optionTextSelected: {
    color: colors.main.white,
    fontSize: font.size.l,
  },
  saveButton: {
    backgroundColor: colors.indicators.green,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  buttonText: {
    color: colors.main.white,
    fontSize: 16
  }
})
