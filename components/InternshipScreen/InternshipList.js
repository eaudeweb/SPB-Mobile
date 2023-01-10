import React, { useEffect } from 'react'
import { StyleSheet, View, Platform, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import InternshipListItem from '../../utils/InternshipListItem'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors, font } from '../../styles/globalStyle'
import { useSelector } from 'react-redux';

export default function InternshipsList(props) {
  const { filteredInternships, setFilteredInternships } = props
  const styles = getStyles(useBottomTabBarHeight())
  const internships = useSelector(state => state.internships.internships)

  useEffect(() => {
    setFilteredInternships(() => getInternshipsByStartDate())
  }, [])

  const getCompaniesName = (internshipsList) => {
    const companies = []
    internshipsList.map(internship => {
      if (!companies.includes(internship.company.name)) {
        companies.push(internship.company.name)
      }
    })
    return companies
  }
  const getInternshipsByCompany = (sortedInternships) => {
    const companies = getCompaniesName(sortedInternships)
    const internshipList = []
    companies.map(company => {
      const companyInternships = sortedInternships.filter(internship => internship.company.name === company)
      internshipList.push({
        companyName: company,
        internships: companyInternships
      })
    })
    return internshipList
  }
  const sortInternshipsByDate = () => {
    return [...internships].sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
  }
  const getInternshipsByStartDate = () => {
    return getInternshipsByCompany(sortInternshipsByDate())
  }

  return (
    <View style={styles.container}>
      {filteredInternships?.map((item, index) => (
        <View key={index}>
          <Text style={styles.companyTitle}>{item.companyName}</Text>
          {item.internships?.map((internship, index) => <InternshipListItem {...props} internship={internship} parentRoute={useRoute().name} key={index} />)}
        </View>
      ))}
    </View>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight - 20 : 10
  },
  companyTitle: {
    color: colors.main.accent,
    fontSize: font.size.l,
    marginHorizontal: 10
  }
})
