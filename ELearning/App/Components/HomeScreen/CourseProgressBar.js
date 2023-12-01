import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function CourseProgressBar({
  totalChapters = 0,
  completedChapters = 0
}) {
  const width = (completedChapters / totalChapters) * 100
  return (
    <View style={{
      width: '95%',
      height: 7,
      backgroundColor: Colors.GRAY,
      borderRadius: 50,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10
    }}>
      <View style={{
        width: `${width}%`,
        height: 7,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 50
      }}></View>
    </View>
  )
}