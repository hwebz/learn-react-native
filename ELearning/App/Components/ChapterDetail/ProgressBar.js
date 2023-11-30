import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function ProgressBar({
  contentLength,
  contentIndex
}) {
  const items = Array.from({ length: contentLength }, (_, i) => i + 1)
  const width = 100 / contentLength
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      paddingLeft: 20,
      paddingRight: 20
    }}>
      {items.map((_, index) => (
        <View
          style={{
            width: `${width}%`,
            height: 5,
            backgroundColor: index <= contentIndex ? Colors.SECONDARY : Colors.GRAY,
            borderRadius: 5
          }}
        />
      ))}
    </View>
  )
}