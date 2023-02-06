import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native'
import { SearchBar } from '@rneui/themed';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import InternshipsFilter from './InternshipsFilter';
import InternshipList from './InternshipList';
import { colors, components } from '../../styles/globalStyle'
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Loading from './Loading';
import tokenLogic from "../../utils/tokenLogic";
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import { getAllPartnerCompanies } from '../../features/companies/companiesSlice';

export default function InternshipMain(props) {
  const styles = getStyles(useBottomTabBarHeight())
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const { isLoading } = useSelector(state => state.internships)
  //TODO cities/categories/companies use form 
  // TODO add clear filters button/option 
  const updateSearch = (text) => {
    setSearchText(text)
  }

  const test = async () => {
    const currentToken = await tokenLogic.getToken()
    const decodedToken = jwtDecode(currentToken)
    const currentTime = new Date().getTime() / 1000 //unix time in seconds

    const isExpired = currentTime > decodedToken.exp
    // console.log(moment(1675688901).format('h:mm:ss '))
    // console.log(moment(new Date().getTime()).format('h:mm:ss '))
    // console.log(currentToken)
    // const decoded = jose.decodeJwt(currentToken)
    // console.log(decoded)

    // const response = await axios.post('https://staging.stagiipebune.ro/api/v1/token/refresh', {
    //   body: {
    //     token: currentToken
    //   }
    // })
    // console.log(response)
    // console.log(decodedToken)
    // dispatch(getAllPartnerCompanies())

  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={components.screenHeader}>{true && 'INTERNSHIPS'}</Text>
        <FaIcon name={'search'} size={32} color={colors.main.accent} onPress={test} />

        {/* TODO implement search bar  */}
        <SearchBar
          onChangeText={updateSearch}
          value={searchText}
          placeholder={'Search'}
          placeholderTextColor={colors.secondary.lightGrey}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          searchIcon={
            <FaIcon name={'search'} size={18} color={colors.secondary.lightGrey} />
          }
        />
        <InternshipsFilter />
        {isLoading ?
          <Loading />
          :
          <InternshipList {...props} />
        }
      </ScrollView>

    </SafeAreaView>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  },
  searchContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: '#424242',
  },
  inputStyle: {
    color: colors.secondary.lightGrey
  }
})
