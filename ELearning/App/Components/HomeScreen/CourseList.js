import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services'
import Colors from '../../Utils/Colors'
import Course from './Course'
import { useNavigation } from '@react-navigation/native'

export default function CourseList({
  level,
  color
}) {
  const navigation = useNavigation()

  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, [])

  const getCourses = async () => {
      const courses = await getCourseList(level)
      setCourses(courses)
  }
  return (
    <View>
      <Text style={{
        fontSize: 26,
        fontFamily: 'OutfitBold',
        color: color ?? Colors.BLACK,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20,
      }}>Basic Course</Text>

      <FlatList
        style={{
          paddingLeft: 20
        }}
        data={courses}
        key={courses.id}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('CourseDetail', {
              course: item
            })
          }}>
            <Course course={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}