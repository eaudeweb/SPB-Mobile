import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity, RefreshControl, StatusBar } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors, font, components } from '../../styles/globalStyle'
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from '../../features/news/newsSlice';
import moment from 'moment';
import Loading from '../InternshipScreen/Loading';

export default function NewsMain({ navigation }) {
  const styles = getStyles(useBottomTabBarHeight())
  const dispatch = useDispatch()
  const { news, isLoading } = useSelector(state => state.news)

  const onRefresh = () => {
    dispatch(getNews())
  }
  const NewsItem = ({ newsItem }) => {
    return (
      <TouchableOpacity disabled={true}  >
        <View style={styles.newsItemWrap}>
          <View flexDirection={'row'} alignItems={'center'} marginBottom={5}>
            <Text style={styles.newsItemTitle}>{newsItem.title}</Text>
          </View>
          <View marginBottom={5}>
            <Text style={[styles.newsItemText, { color: colors.secondary.lightGrey }]}>{moment(newsItem.added, "DD/MM/yyyy - hh:mm:ss").fromNow()}</Text>
          </View>
          <View>
            <Text style={styles.newsItemText}>{newsItem.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const NewsList = () => {
    return (
      <View>
        {news?.map((newsItem, index) => <NewsItem newsItem={newsItem} key={index} />)}
      </View>
    )
  }
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <Text style={[components.screenHeader, { marginHorizontal: 0 }]}>NEWS</Text>
        <View style={styles.innerContainer}>
          {isLoading ?
            <Loading />
            :
            news.length === 0 ?
              <Text style={[styles.newsItemText, { marginTop: 10 }]}>No news yet</Text>
              :
              <NewsList />
          }
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    marginHorizontal: 10,
    minHeight: '100%',
  },
  innerContainer: {
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight : bottomTabHeight * 2,
  },

  newsItemWrap: {
    backgroundColor: colors.secondary.darkGrey,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10
  },
  newsItemTitle: {
    color: colors.main.accent,
    fontSize: font.size.l,
    fontFamily: 'Basier Square Medium'
  },
  newsItemText: {
    color: colors.main.white,
    fontSize: font.size.m,
    fontFamily: 'Basier Square Regular'
  }
})
