import React, { useEffect, useState, useCallback } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../../utils/InternshipListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import Collapsible from 'react-native-collapsible';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { colors, font } from '../../../styles/globalStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import Loading from '../../InternshipScreen/Loading'
import { getStudentInternships, refreshStudentInternships } from '../../../features/internships/internshipsSlice';
import { useDispatch } from 'react-redux';

export default function ApplicationList(props) {
  const dispatch = useDispatch()
  const styles = getStyles(useBottomTabBarHeight())
  const { isLoading, studentInternships, isRefreshLoading } = useSelector(state => state.internships)
  const [applications, setApplications] = useState(studentInternships)
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true)
  const [applicationsFilter, setApplicationsFilter] = useState({
    accepted: false,
    interview: false,
    applied: false
  })
  const handleFilterTap = (filterType) => {
    setApplicationsFilter({
      ...applicationsFilter,
      [filterType]: !applicationsFilter[filterType]
    })
  }
  const onRefresh = useCallback(() => {

    dispatch(refreshStudentInternships())

  }, []);

  const FilterButton = ({ name, type, active }) => {
    return (
      <TouchableOpacity onPress={() => handleFilterTap(type)}>
        <View style={active ? styles.filterButtonWrapperActive : styles.filterButtonWrapper}>
          <Text style={active ? styles.filterButtonTextActive : styles.filterButtonText} >{name}</Text>
          <FaIcon name={active ? 'check' : 'times'} size={18} color={active ? colors.main.cappuccino : colors.secondary.lightGrey} />
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    dispatch(getStudentInternships())
  }, [])

  //  TODO refactor
  const filterInternships = () => {
    // ACCEPTED = 3 | INTERVIEW = 2 | APPLIED = 1   <<< job status meaning
    const { accepted, interview, applied } = applicationsFilter
    const acceptedInternships = studentInternships.filter(application => accepted ? application.status === 3 : '')
    const interviewInternships = studentInternships.filter(application => interview ? application.status === 2 : '')
    const appliedInternships = studentInternships.filter(application => applied ? application.status === 1 : '')
    const filteredResults = [...acceptedInternships, ...interviewInternships, ...appliedInternships]
    const result = filteredResults.length > 0 ? filteredResults : studentInternships

    setApplications(result)
  }

  useEffect(() => {
    filterInternships()
  }, [applicationsFilter, studentInternships])

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshLoading} onRefresh={onRefresh} />
        }
      >
        <View style={{ margin: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => setIsFilterCollapsed(!isFilterCollapsed)}>
            <Text style={{ color: '#F26649', fontSize: 18 }}>Filter:</Text>
            <Ionicon name={isFilterCollapsed ? 'chevron-down' : 'chevron-up'} size={26} color='#F26649' />
          </TouchableOpacity>
          <Collapsible collapsed={isFilterCollapsed}>
            <View flexDirection={'row'}>
              <FilterButton name={'Accepted'} type={'accepted'} active={applicationsFilter.accepted} />
              <FilterButton name={'Interview'} type={'interview'} active={applicationsFilter.interview} />
              <FilterButton name={'Pending'} type={'applied'} active={applicationsFilter.applied} />
            </View>
          </Collapsible>
        </View>
        {isLoading ?
          <Loading />
          :
          applications?.map((internship, index) => <InternshipListItem {...props} index={index} internship={internship} swipeable={true} parentRoute={useRoute().name} key={index} />)
        }
      </ScrollView>
    </View>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight + 30 : bottomTabHeight + 10
  },
  dropDownView: {
    marginBottom: 15
  },
  dropdown: {
    height: 50,
    borderColor: '#757575',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#424242',
    color: 'white',
    marginHorizontal: 15,
  },
  dropdownContainer: {
    paddingHorizontal: 15
  },
  filterButtonWrapperActive: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyItems: 'center',
    backgroundColor: colors.buttonBackground.orange,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    marginVertical: 5
  },
  filterButtonTextActive: {
    fontSize: font.size.m,
    color: colors.main.cappuccino,
    marginRight: 5
  },
  filterButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyItems: 'center',
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    marginVertical: 5
  },
  filterButtonText: {
    fontSize: font.size.m,
    color: colors.secondary.lightGrey,
    marginRight: 5
  },
  companyTitle: {
    color: colors.main.accent,
    fontSize: font.size.l,
    marginHorizontal: 10
  }
})
