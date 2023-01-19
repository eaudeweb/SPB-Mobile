import { View, Text } from 'react-native'
import React from 'react'
import ContentLoader, { Rect } from "react-content-loader/native"
import { colors } from '../../styles/globalStyle'

const Loading = () => {
  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={476}
      height={220}
      viewBox="0 0 476 220"
      backgroundColor={colors.secondary.darkGrey}
      foregroundColor={colors.secondary.mediumGrey}
      {...props}
    >
      <Rect x="10" y="10" rx="5" ry="5" width="139" height="15" />
      <Rect x="10" y="40" rx="5" ry="5" width="371" height="70" />
      <Rect x="10" y="120" rx="5" ry="5" width="371" height="70" />
    </ContentLoader>
  )

  return (
    <View>
      <MyLoader />
      <MyLoader />
    </View>
  )
}

export default Loading