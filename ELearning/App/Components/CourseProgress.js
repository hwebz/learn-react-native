import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { FlatList } from 'react-native-gesture-handler'
import Course from './HomeScreen/Course'
import { useNavigation } from '@react-navigation/native'

export default function CourseProgress({
  progressCourses
}) {
  const navigation = useNavigation()
  return (
    <View style={{
      marginBottom: 30
    }}>
      <Text style={{
        fontSize: 26,
        fontFamily: 'OutfitBold',
        color: Colors.WHITE,
        lineHeight: 35,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20,
      }}>Courses in progress</Text>

      <FlatList
        style={{
          paddingLeft: 20
        }}
        data={progressCourses}
        key={progressCourses.id}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('CourseDetail', {
              course: item.course
            })
          }}>
            <Course course={item.course} completedChapters={item.completedChapters} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}