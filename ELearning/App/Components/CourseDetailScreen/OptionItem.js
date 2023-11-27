import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function OptionItem({
    icon,
    label,
    style
}) {
  return (
    <View style={{
        ...style,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'flex-start',
    }}>
      <Ionicons name={icon} size={24} color="black" />
      <Text>{label}</Text>
    </View>
  )
}