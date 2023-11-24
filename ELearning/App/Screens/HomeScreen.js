import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'

export default function HomeScreen() {
  return (
    <View>
      <View style={{
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        paddingTop: 50
      }}>
        <Header />
      </View>
    </View>
  )
}