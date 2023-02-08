import React from 'react'
import { StyleSheet, Pressable, View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Modal } from 'react-native'
import { colors, font } from '../../styles/globalStyle'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../features/filters/filtersSlice';

export default function FilterModal(props) {
  const { modalVisible, setModalVisible } = props
  const { internships } = useSelector(state => state.internships)
  const { selectedFilter, internshipsFilter } = useSelector(state => state.filters)
  const dispatch = useDispatch()
  const { resetSelectedFilter, updateFilterList } = filtersActions
  const companies = [...new Set(internships.map(internship => internship.company.name))].sort();
  const currentFilters = {
    category: internshipsFilter.category,
    location: internshipsFilter.location,
    company: internshipsFilter.company
  }
  const handleSave = () => {
    setModalVisible(false)
  }
  const handleCancel = () => {
    dispatch(resetSelectedFilter())
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
  const handleCompanyFilterPress = (company) => {
    internshipsFilter.company.name === company.name ?
      dispatch(updateFilterList({ type: 'company', value: '' }))
      :
      dispatch(updateFilterList({ type: 'company', value: company }))
  }

  const handleCategoryFilterPress = (category) => {
    internshipsFilter.category.name === category.name ?
      dispatch(updateFilterList({ type: 'category', value: '' }))
      :
      dispatch(updateFilterList({ type: 'category', value: category }))
  }

  const handleLocationFilterPress = (location) => {
    internshipsFilter.location.name === location.name ?
      dispatch(updateFilterList({ type: 'location', value: '' }))
      :
      dispatch(updateFilterList({ type: 'location', value: location }))
  }

  const CompaniesFilter = () => {
    return props.companies.map((company, index) => {
      return internshipsFilter.company.name?.includes(company.name) ?
        <SelectedOption key={index} option={company.name} handlePress={() => handleCompanyFilterPress(company)} />
        :
        <Option key={index} option={company.name} handlePress={() => handleCompanyFilterPress(company)} />
    })

  }
  const CategoriesFilter = () => {
    return props.categories.map((category, index) => {
      return internshipsFilter.category.name?.includes(category.name) ?
        <SelectedOption key={index} option={category.name} handlePress={() => handleCategoryFilterPress(category)} />
        :
        <Option key={index} option={category.name} handlePress={() => handleCategoryFilterPress(category)} />
    })
  }
  const LocationsFilter = () => {
    return props.locations.map((location, index) => {
      return internshipsFilter.location === location ?
        <SelectedOption key={index} option={location.name} handlePress={() => handleLocationFilterPress(location)} />
        :
        <Option key={index} option={location.name} handlePress={() => handleLocationFilterPress(location)} />
    })
  }

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
            <Text style={styles.modalTitle}>Companies</Text>
            <ScrollView style={{ width: '100%' }}>
              {selectedFilter === 'companies' && <CompaniesFilter />}
              {selectedFilter === 'city' && <LocationsFilter />}
              {selectedFilter === 'categories' && <CategoriesFilter />}
              {/* {selectedFilter === 'categories' && props.categories.map((category, index) => <Option key={index} option={category.name} handlePress={() => handleCompanyFilterPress(company)} />)} */}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
              <TouchableHighlight style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Apply filter</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.saveButton, { backgroundColor: colors.indicators.red }]} onPress={handleSave}>
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
