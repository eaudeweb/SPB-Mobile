import { View, Text } from 'react-native'
import React from 'react'
import ContentLoader, { Rect } from "react-content-loader/native"
import { colors } from '../../styles/globalStyle'

const Loading = () => {
  const MyLoader = (props) => (
    <ContentLoader
      speed={1}
      width={476}
      height={124}
      viewBox="0 0 476 123"
      backgroundColor={colors.main.white}
      foregroundColor={colors.main.accent}
      {...props}
    >
      <Rect x="0" y="20" rx="4" ry="4" width="350" height="100" />
    </ContentLoader>
  )


  return (
    <View>
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </View>
  )
}
export default Loading