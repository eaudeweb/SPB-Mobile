import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../../utils/InternshipListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import Collapsible from 'react-native-collapsible';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { colors, font } from '../../../styles/globalStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Loading from '../../InternshipScreen/Loading'
import { getStudentInternships } from '../../../features/internships/internshipsSlice';
import { useDispatch } from 'react-redux';

export default function ApplicationList(props) {
  const dispatch = useDispatch()
  const styles = getStyles(useBottomTabBarHeight())
  const { isLoading, studentInternships } = useSelector(state => state.internships)
  const [applications, setApplications] = useState(studentInternships)
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true)
  const [applicationsFilter, setApplicationsFilter] = useState({
    accepted: true,
    interview: true,
    applied: true
  })
  const handleFilterTap = (type) => {
    const newFilter = { ...applicationsFilter }
    newFilter[type] = !newFilter[type]

    setApplicationsFilter(newFilter)
  }
  const FilterButton = ({ name, type, active }) => {
    return (
      <TouchableOpacity onPress={() => handleFilterTap(type)}>
        <View style={active ? styles.filterButtonWrapperActive : styles.filterButtonWrapper}>
          <Text style={active ? styles.filterButtonTextActive : styles.filterButtonText} >{name}</Text>
          <IonIcon name={active ? 'checkmark-circle-outline' : 'checkmark-outline'} size={22} color={active ? colors.main.cappuccino : colors.secondary.lightGrey} />
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    dispatch(getStudentInternships())
  }, [])
  useEffect(() => {
    if (applicationsFilter.accepted && applicationsFilter.interview && applicationsFilter.applied) {
      setApplications(studentInternships)
    } else {
      if (applicationsFilter.accepted && applicationsFilter.interview) {
        const updatedApplications = internshipsAppliedTo.filter(application => {
          return application.interviewStatus || application.acceptedStatus
        })
        setApplications(updatedApplications)
      } else if (applicationsFilter.accepted && applicationsFilter.applied) {
        const updatedApplications = internshipsAppliedTo.filter(application => {
          return application.accepted || !application.interviewStatus
        })
        setApplications(updatedApplications)
      } else if (applicationsFilter.interview && applicationsFilter.applied) {
        const updatedApplications = internshipsAppliedTo.filter(application => {
          return application.interviewStatus || !application.acceptedStatus
        })
        setApplications(updatedApplications)
      } else if (applicationsFilter.accepted) {
        const updatedApplications = internshipsAppliedTo.filter(application => application.acceptedStatus)
        setApplications(updatedApplications)
      } else if (applicationsFilter.interview) {
        const updatedApplications = internshipsAppliedTo.filter(application => application.interviewStatus)
        setApplications(updatedApplications)
      } else if (applicationsFilter.applied) {
        const updatedApplications = internshipsAppliedTo.filter(application => {
          return !application.interviewStatus && !application.acceptedStatus
        })
        setApplications(updatedApplications)
      } else {
        setApplications([])
      }
    }

  }, [applicationsFilter, studentInternships])

  return (
    <View style={styles.container}>
      <ScrollView>
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
          ''
        }
        {studentInternships?.map((internship, index) => <InternshipListItem {...props} index={index} internship={internship} swipeable={true} parentRoute={useRoute().name} key={index} />)}
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
