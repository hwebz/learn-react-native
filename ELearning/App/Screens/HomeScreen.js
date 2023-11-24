import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={{
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120
      }}>
        <Header />
      </View>
      <View>
        <View style={{
          marginTop: -80,
          marginBottom: 30
        }}>
          <CourseList level='Basic' color={Colors.WHITE} />
        </View>
        <View style={{
          marginBottom: 30
        }}>
          <CourseList level='Advance' />
        </View>
      </View>
    </ScrollView>
  )
}