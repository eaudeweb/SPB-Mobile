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
  const companies = [...new Set(internships.map(internship => internship.companyName))].sort();

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
  const handleCompanyFilterPress = (companyName) => {
    const isCompanySelected = internshipsFilter.companies.find(company => companyName === company)
    let newArr = [...internshipsFilter.companies]
    if (isCompanySelected) {
      newArr.splice(newArr.indexOf(companyName), 1)
      dispatch(updateFilterList({ type: 'companies', newArr: newArr }))
    } else {
      newArr.push(companyName)
      dispatch(updateFilterList({ type: 'companies', newArr: newArr }))
    }
  }

  const CompaniesFilter = () => {
    return companies.map((company, index) => {
      return internshipsFilter.companies.find(companyName => companyName === company) ?
        <SelectedOption key={index} option={company} handlePress={() => handleCompanyFilterPress(company)} />
        :
        <Option key={index} option={company} handlePress={() => handleCompanyFilterPress(company)} />
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
            </ScrollView>
            <TouchableHighlight style={styles.saveButton} onPress={handleSave}>
              <Text style={[styles.textStyle, { fontSize: 16 }]}>Apply filter</Text>
            </TouchableHighlight>
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
    color: 'white',
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
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  }
})
