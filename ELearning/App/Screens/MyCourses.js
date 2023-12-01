import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { useUser } from '@clerk/clerk-expo'
import { getAllProgressCourses } from '../Services'
import MyCourse from '../Components/MyCourses/MyCourse'
import { useNavigation } from '@react-navigation/native'

export default function MyCourses() {
  const { user } = useUser()
  const navigation = useNavigation()
  const [progressCourses, setProgressCourses] = useState([])

  useEffect(() => {
    if (user) {
      getProgressCourses()
    }
  }, [])

  const getProgressCourses = async () => {
    try {
      const courses = await getAllProgressCourses(user.primaryEmailAddress.emailAddress)
      setProgressCourses(courses)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <View style={{
        height: 160,
        backgroundColor: Colors.PRIMARY,
        padding: 30,
        paddingTop: 50,
      }}>
        <Text style={{
          fontFamily: 'OutfitBold',
          color: Colors.WHITE,
          fontSize: 30
        }}>
          My Courses
        </Text>
      </View>

      <FlatList
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: -50,
          height: '87%'
        }}
        data={progressCourses}
        key={progressCourses.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('MyCourseDetail', {
              course: item.course
            })
          }}>
            <MyCourse course={item.course} completedChapters={item.completedChapters} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}