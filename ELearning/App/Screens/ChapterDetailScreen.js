import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Content from '../Components/ChapterDetail/Content'

export default function ChapterDetailScreen() {
  const { params } = useRoute()
  return params.content && (
    <View style={{
      paddingTop: 50,
    }}>
      <Content content={params.content} />
    </View>
  )
}